import { flexRender } from "@tanstack/react-table";

export default function Table({ table }) {
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
                                >
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}

                                        {header.column.columnDef.enableSorting !== false && (
                                            <span>
                                                {header.column.getIsSorted() === "asc"
                                                    ? " ⬆"
                                                    : header.column.getIsSorted() === "desc"
                                                    ? " ⬇"
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
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    style={{
                                        width: cell.column.columnDef.size,
                                    }}
                                >
                                    <span>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </span>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}