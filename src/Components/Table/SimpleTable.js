import "./style.css";
import { useMemo } from "react";
import { useState } from "react";

const SimpleTable = ({ headers, itemList, showButton, buttonFunction }) => {
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "ascending",
    });
    const columnCount = headers.length;
    const gridTemplateColumns = `1fr ${"1fr ".repeat(
        columnCount - 1 //+ //(showButton ? 1 : 0)
    )} auto`;

    const sortedItems = useMemo(() => {
        // console.log(itemList);
        // console.log(itemList[0]["Wins"]);
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
                {showButton && <div>Actions</div>}
            </div>
            {sortedItems.map((item, index) => (
                <div
                    key={index}
                    className="row"
                    style={{ gridTemplateColumns: gridTemplateColumns }}
                >
                    {headers.map((col, index) => (
                        <div key={index}>
                            {col == "name" ? (
                                <div className="player-basic-bio">
                                    <h5>
                                        {item[col]} - {item.id.substring(0, 3)}
                                    </h5>
                                    <h6>
                                        {item.team} - {item.position}
                                    </h6>
                                </div>
                            ) : typeof item[col] === "string" ||
                              typeof item[col] === "number" ? (
                                item[col]
                            ) : (
                                "N/A" // or any other symbol or message you want to display
                            )}
                        </div>
                    ))}
                    {showButton && (
                        <div>
                            <button
                                className="roster-btn"
                                onClick={() => buttonFunction(item.id)}
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SimpleTable;
