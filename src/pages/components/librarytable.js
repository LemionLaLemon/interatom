import { flexRender } from "@tanstack/react-table";

export default function Table({ table, dragMode, setDragMode }) {
    return (
        <div className="tableWrapper">
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    style={{
                                        width: header.getSize(),
                                        position: "relative",
                                        cursor:
                                            header.column.columnDef.enableSorting !== false
                                                ? "pointer"
                                                : "default",
                                    }}
                                    onClick={
                                        header.column.columnDef.enableSorting !== false
                                            ? header.column.getToggleSortingHandler()
                                            : undefined
                                    }
                                    className={
                                        header.column.getIsSorted() === "asc" || header.column.getIsSorted() === "desc" ? "selected" : ""
                                    }
                                >
                                    <div style={{ display: "block", alignItems: "center" }}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}

                                        {header.column.columnDef.enableSorting !== false && (
                                            <span className="columnsorting">
                                                {header.column.getIsSorted() === "asc"
                                                    ? <img src="/images/tablearrow-up.png" className="tablearrow" />
                                                    : header.column.getIsSorted() === "desc"
                                                    ? <img src="/images/tablearrow-down.png" className="tablearrow" />
                                                    : ""}
                                            </span>
                                        )}
                                    </div>

                                    {header.column.columnDef.enableResizing !== false && (
                                        <div
                                            onMouseDown={header.getResizeHandler()}
                                            onTouchStart={header.getResizeHandler()}
                                            className="resizeHandle"
                                        />
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                                if (cell.column.id === "checkbox") {
                                    return (
                                        <td 
                                            key={cell.id}
                                        
                                            onMouseDown={() => {
                                                const selecting = !row.getIsSelected();
                                                setDragMode(selecting);
                                                row.toggleSelected(selecting);
                                            }}
                                            onMouseEnter={() => {
                                                if (dragMode !== null) {
                                                    row.toggleSelected(dragMode);
                                                }
                                            }}
                                            >
                                            <img src={"/images/checkbox".concat(row.getIsSelected() ? "-checked.png" : ".png")} className="tdselectedcheckbox" draggable={false} />
                                        </td>
                                    );
                                }

                                return (
                                    < td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                )
                                
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}