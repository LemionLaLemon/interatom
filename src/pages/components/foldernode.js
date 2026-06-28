export default function FolderNode({ setRowSelection, node, level = 0, isLast = false, toggleNode, data, setData, selectedFolder, setSelectedFolder, path = [] }) {
    function handleToggle(e) {
        e.stopPropagation();
        setData((prev) => toggleNode(prev, node.id));
    }

    const isSelected = JSON.stringify(path) === JSON.stringify(selectedFolder);

    return (
    <>
      <div className="folderview row" onClick={() => {
        setSelectedFolder(path); 
        setRowSelection({});
      }}>
        <div className="indent">
            {Array.from({ length: level }).map((_, i) => (
                <div key={i} className="vline" data-level={i} data-last={i === level - 1} />
            ))}
        </div>
        <div onClick={handleToggle} className="folderview row">

            <button className="expandimage">
                <img src={(node.expanded ? "/images/minus.png" : "/images/plus.png")} className="expandimage"/>
            </button>

            <img
            src={node.expanded ? "/images/folder-open.png" : "/images/folder.png"}
            className="folderimage"
            />
        </div>

        <span className={`foldername ${isSelected ? 'selected' : ''}`}>{node.name}</span>
      </div>

      {node.expanded &&
        node.children?.map((child, index, arr) => (
          <FolderNode setRowSelection={setRowSelection} setData={setData} data={data} toggleNode={toggleNode} key={child.id} node={child} level={level + 1} isLast={index === arr.length - 1} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} path={[...path, child.name]} />
        ))}
    </>
  );
}