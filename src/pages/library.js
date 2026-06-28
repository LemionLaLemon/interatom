import { Helmet } from "react-helmet-async";
import { useEffect, useState, useMemo } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, flexRender, getSortedRowModel } from "@tanstack/react-table";
import styles from "./styles/dss.css"
import LibraryTable from "./components/librarytable";
import Pagination from "./components/pagination";
import FolderView from "./components/folderview";

const columns = [
        {
            id: 'checkbox',
            header: "",
            cell: () => null,
            size: 20,
            enableResizing: false,
            enableSorting: false,
        },
        {
            id: 'icon',
            header:  '',
            cell: '',
            size: 20,
            enableResizing: false,
            enableSorting: false,
        },
        {
            accessorKey: 'title',
            header: 'Document Title',
            size: 90,
        },
        {
            accessorKey: 'description',
            header: 'Document Description',
            size: 200,
        },
        {
            accessorKey: 'dateAdded',
            header: 'Date Added',
            size: 90,
        },
        {
            accessorKey: 'documentDate',
            header: 'Document Date',
            size: 90,
        },
        {
            accessorKey: 'size',
            header: 'Size',
            size: 50,
        },
    ]

export default function Page() {
    const [activeTab, setActiveTab] = useState('folder');
    const [columnSizing, setColumnSizing] = useState({});
    const [sorting, setSorting] = useState([]);
    const [dragMode, setDragMode] = useState(null);
    const [rowSelection, setRowSelection] = useState({});
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState([]);
    const [documents, setDocuments] = useState(null);

    const data = useMemo(
        () => documents ? getFolderContents(documents, selectedFolder) : [],
        [documents, selectedFolder]
    )

    function getFolderContents(tree, path) {
        let current = tree;

        for (const folder of path) {
            current = current?.[folder]?.children;

            if (!current) return [];
        }

        return Object.entries(current)
        .filter(([_, item]) => item.kind === "file")
        .map(([name, item]) => ({
            title: name,
            path: [...path, name],
            kind: item.kind,
            description: item.description ?? "",
            dateAdded: item.dateAdded ?? "",
            documentDate: item.documentDate ?? "",
            size: item.size ?? "",
            type: item.type ?? "",
        }));
    }

    function openSelected() {
        table.getSelectedRowModel().rows.forEach(row => {
            const file = row.original;
            const url = "/library/documents/" + file.path.join("/") + "." + file.type;
            window.open(url, "_blank");
        })
    }

    function downloadSelected() {
        table.getSelectedRowModel().rows.forEach(row => {
            const file = row.original;

            const a = document.createElement("a");
            a.href = "/library/documents/" + file.path.join("/") + "." + file.type;
            a.download = file.title + "." + file.type;
            a.click();
        })
    }

    const table = useReactTable({
        data,
        columns,
        state: {
            columnSizing,
            sorting,
            rowSelection
        },
        onRowSelectionChange: setRowSelection,
        onColumnSizingChange: setColumnSizing,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        columnSizeMode: 'onChange',
    })

    const pageSize = table.getState().pagination.pageSize;
    const pageIndex = table.getState().pagination.pageIndex;
    const totalRows = table.getFilteredRowModel().rows.length;
    const pageCount = table.getPageCount();
    const startRow = pageIndex * pageSize + 1;
    const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

    useEffect(() => {
        const stopDragging = () => setDragMode(null);

        window.addEventListener("mouseup", stopDragging);

        fetch("/library/documents.json")
        .then(r => r.json())
        .then(setDocuments)

        return () => {
            window.removeEventListener("mouseup", stopDragging);
        };
    }, []);

    return(
        <>
            <Helmet>
                <title>Document Search Service - InterATOM Power</title>
            </Helmet>
            <div className="wss">
                <div className="tabs">
                    <button className={`tab ${activeTab === 'folder' ? 'selected' : ''}`} onClick={() => setActiveTab('folder')}>
                        <span>Folder View</span>
                    </button>
                    <button className={`tab ${activeTab === 'content' ? 'selected' : ''}`} onClick={() => setActiveTab('content')}>
                        <span>Content Search</span>
                    </button>
                    <button className={`tab ${activeTab === 'advanced' ? 'selected' : ''}`} onClick={() => setActiveTab('advanced')}>
                        <span>Advanced Search</span>
                    </button>
                </div>
                <div className={`container ${sidebarCollapsed ? 'collapsed' : ''}`}>
                    {!sidebarCollapsed ? 
                        <>
                            <div className="DSS">
                                <span>DSS Library</span>
                                <button className="collapse" onClick={() => setSidebarCollapsed(prev => !prev)}>
                                    <img src="/images/collapse-icon.png"/>
                                </button>
                            </div>
                            <div className="Folders">
                                <div className={activeTab === "folder" ? "" : "hidden"}>
                                    <FolderView setRowSelection={setRowSelection} documents={documents} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} />
                                </div>
                            </div>
                        </>
                        :
                        <div className="dss-folders-collapsed">
                            <button className="collapse" onClick={() => setSidebarCollapsed(prev => !prev)}>
                                <img src="/images/uncollapse-icon.png"/>
                            </button>
                        </div>
                    }
                    
                    <div className="Actions">
                        <button className="action" onClick={openSelected}>
                            <img src="/images/Open.png"/>
                            <span>Open</span>
                        </button>
                        <button className="action" onClick={downloadSelected}>
                            <img src="/images/Download.png"/>
                            <span>Download</span>
                        </button>
                        <button className="action">
                            <img src="/images/Properties.png"/>
                            <span>Properties</span>
                        </button>
                    </div>
                    <div className="FolderContent">
                        <LibraryTable documents={documents} table={table} dragMode={dragMode} setDragMode={setDragMode} />
                    </div>
                    <div className="PageControls">
                        <Pagination table={table}/> 
                    </div>
                </div>
            </div>
        </>
    );
};