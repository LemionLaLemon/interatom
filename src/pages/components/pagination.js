import { useState } from "react";

export default function Pagination({ table }) {
    const pageSize = table.getState().pagination.pageSize;
    const pageIndex = table.getState().pagination.pageIndex;
    const totalRows = table.getFilteredRowModel().rows.length;
    const pageCount = table.getPageCount();

    const [isMobile, setIsMobile] = useState(
        window.matchMedia("(max-width:768px)").matches
    );

    if (!isMobile) {
        return(
            <>
                <div className="pagination">
                    <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                        <img src={"/images/skipstart".concat(table.getCanPreviousPage() ? "-active.png" : ".png")}/>
                    </button>
                    <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        <img src={"/images/previous".concat(table.getCanPreviousPage() ? "-active.png" : ".png")}/>
                    </button>
                    <span>
                        Page <input 
                            type="number" 
                            min="1" 
                            max={pageCount}
                            value={pageIndex + 1}
                            onChange={(e) => table.setPageIndex(Number(e.target.value) - 1)}
                            className="pageinput"
                        /> of {pageCount}
                    </span>
                    <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        <img src={"/images/next".concat(table.getCanNextPage() ? "-active.png" : ".png")}/>
                    </button>
                    <button onClick={() => table.setPageIndex(pageCount - 1)} disabled={!table.getCanNextPage()}>
                        <img src={"/images/skipend".concat(table.getCanNextPage() ? "-active.png" : ".png")}/>
                    </button>
                    
                </div>
                <span className="pageselection">
                    Displaying 
                    <select
                        value={pageSize}
                        onChange={(e) => table.setPageSize(Number(e.target.value))}
                        style={{ margin: '0 4px' }}
                        className="pagerendereditems"
                    >
                        {[10, 20, 50, 100].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                    items per page of total <b>{totalRows}</b>
                </span>
            </>
        )
    }else{
        return(
            <>
                <div className="pagination">
                    <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                        <img src={"/images/skipstart".concat(table.getCanPreviousPage() ? "-active.png" : ".png")}/>
                    </button>
                    <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        <img src={"/images/previous".concat(table.getCanPreviousPage() ? "-active.png" : ".png")}/>
                    </button>
                    <span>
                        <input 
                            type="number" 
                            min="1" 
                            max={pageCount}
                            value={pageIndex + 1}
                            onChange={(e) => table.setPageIndex(Number(e.target.value) - 1)}
                            className="pageinput"
                        /> of {pageCount}
                    </span>
                    <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        <img src={"/images/next".concat(table.getCanNextPage() ? "-active.png" : ".png")}/>
                    </button>
                    <button onClick={() => table.setPageIndex(pageCount - 1)} disabled={!table.getCanNextPage()}>
                        <img src={"/images/skipend".concat(table.getCanNextPage() ? "-active.png" : ".png")}/>
                    </button>
                    
                </div>
                <span className="pageselection">
                    <select
                        value={pageSize}
                        onChange={(e) => table.setPageSize(Number(e.target.value))}
                        style={{ margin: '0 4px' }}
                        className="pagerendereditems"
                    >
                        {[10, 20, 50, 100].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                    of total <b>{totalRows}</b> items
                </span>
            </>
        )
    }
}