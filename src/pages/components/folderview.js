import { useEffect, useState } from "react";
import FolderNode from "./foldernode"

export default function FolderView({setRowSelection, documents, selectedFolder, setSelectedFolder}){
    const [data, setData] = useState([]);

    let nextId = 1;

    function buildFolders(tree) {
        return Object.entries(tree)
            .filter(([_, item]) => item.kind === "folder")
            .map(([name, item]) => ({
                id: nextId++,
                name,
                expanded: false,
                children: buildFolders(item.children || {})
            }))
    }

    useEffect(() => {
        if (!documents) return;
        setData(buildFolders(documents));
    }, [documents]);

    function toggleNode(nodes, id) {
        return nodes.map((node) => {
            if (node.id == id){
                return{ ...node, expanded: !node.expanded };
            }

            if (node.children?.length) {
                return {
                    ...node,
                    children: toggleNode(node.children, id)
                };
            }
            return node;
        })
    }

    function handleToggle(id) {
        setData((prev) => toggleNode(prev, id));
    }

    return(
        <>
            {data.map((node, index) => (
                <FolderNode setRowSelection={setRowSelection} toggleNode={toggleNode} setData={setData} data={data} key={node.id} node={node} hasSiblingBelow={index < data.length - 1} isLast={index === data.length - 1} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} path={[node.name]} />
            ))}
        </>
    )
}