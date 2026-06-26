import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, flexRender, getSortedRowModel } from "@tanstack/react-table";
import styles from "./styles/dss.css"
import LibraryTable from "./components/librarytable";
import tabledata from "./data/table";

const data = tabledata

const columns = [
    {
        id: 'checkbox',
        header: "",
        cell: () => <input type="checkbox"/>,
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

    const table = useReactTable({
        data,
        columns,
        state: {
            columnSizing,
            sorting,
        },
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
                <div className="container">
                    <div className="DSS">
                        <span>DSS Library</span>
                        <button className="collapse">
                            <img src="/images/collapse-icon.png"/>
                        </button>
                    </div>
                    <div className="Folders">
                    </div>
                    <div className="Actions">
                        <button className="action">
                            <img src="/images/Open.png"/>
                            <span>Open</span>
                        </button>
                        <button className="action">
                            <img src="/images/Download.png"/>
                            <span>Download</span>
                        </button>
                        <button className="action">
                            <img src="/images/Properties.png"/>
                            <span>Properties</span>
                        </button>
                    </div>
                    <div className="FolderContent">
                        <LibraryTable table={table} />
                    </div>
                    <div className="PageControls">
                        <div className="pagination">
                            <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                                <img src="/images/skipstart.png"/>
                            </button>
                            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                                <img src="/images/previous.png"/>
                            </button>
                            <span>
                                Page <input 
                                    type="number" 
                                    min="1" 
                                    max={pageCount}
                                    value={pageIndex + 1}
                                    onChange={(e) => table.setPageIndex(Number(e.target.value) - 1)}
                                    style={{ width: '40px' }}
                                /> of {pageCount}
                            </span>
                            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                <img src="/images/next.png"/>
                            </button>
                            <button onClick={() => table.setPageIndex(pageCount - 1)} disabled={!table.getCanNextPage()}>
                                <img src="/images/skipend.png"/>
                            </button>
                            
                        </div>
                        <span className="pageselection">
                            Displaying 
                            <select
                                value={pageSize}
                                onChange={(e) => table.setPageSize(Number(e.target.value))}
                                style={{ margin: '0 4px' }}
                            >
                                {[10, 20, 50, 100].map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                            items per page of {totalRows} total
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};