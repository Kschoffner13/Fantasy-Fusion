import "./style.css";
import { useMemo } from "react";
import { useState } from "react";

const SimpleTable = ({ headers, itemList }) => {
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "ascending",
    });
    const columnCount = headers.length;
    const gridTemplateColumns = `2fr ${"1fr ".repeat(columnCount - 1)}`;

    const sortedItems = useMemo(() => {
        let sortableItems = [...itemList];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [itemList, sortConfig]);

    const requestSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="table">
            <div
                className="header"
                style={{ gridTemplateColumns: gridTemplateColumns }}
            >
                {headers.map((col, index) => (
                    <div
                        key={index}
                        onClick={() => requestSort(col)}
                        className={
                            sortConfig.key === col ? "sorted-header" : ""
                        }
                    >
                        {col}{" "}
                        {sortConfig.key === col
                            ? sortConfig.direction === "ascending"
                                ? "↑"
                                : "↓"
                            : ""}
                    </div>
                ))}
            </div>
            {sortedItems.map((item, index) => (
                <div key={index} className="row">
                    {headers.map((col, index) => (
                        <div key={index}>{item[col] || "-"}</div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default SimpleTable;
