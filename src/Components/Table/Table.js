import "./style.css";

const Table = ({
    headers,
    roster,
    rosterPlacement,
    filterKeys,
    buttonLabel,
    glStats,
}) => {
    const columnCount = headers.length + 1; // Determine column count based on headers size + 1
    const gridTemplateColumns = `2fr ${"1fr ".repeat(columnCount - 1)}`;

    return (
        <div
            className={`table ${columnCount <= 3 ? "utl-table" : ""} ${
                columnCount > 3 && columnCount < 12 ? "league-table" : ""
            }`}
        >
            <div
                className="header"
                style={{ gridTemplateColumns: gridTemplateColumns }}
            >
                {headers.map((col, index) => (
                    <div key={index}>{col}</div>
                ))}
                <div className="extra-column"></div>
            </div>
            {Object.keys(rosterPlacement)
                .filter((key) =>
                    filterKeys.some((filterKey) => key.startsWith(filterKey))
                )
                .map((key, index) => {
                    const player = roster.find(
                        (player) => player.id === rosterPlacement[key]
                    );
                    return (
                        <>
                            {key.startsWith("GL") && (
                                <div className="header gl-header">
                                    {glStats.map((stat, index) => (
                                        <div key={index}>{stat}</div>
                                    ))}
                                    <div className="extra-column"></div>
                                </div>
                            )}
                            <div key={index} className="row">
                                {player ? (
                                    key.startsWith("GL") ? (
                                        glStats.map((stat, index) => (
                                            <div key={index}>
                                                {player[stat] || "-"}
                                            </div>
                                        ))
                                    ) : (
                                        headers.map((col, index) => (
                                            <div key={index}>
                                                {player[col] || "-"}
                                            </div>
                                        ))
                                    )
                                ) : (
                                    <p>-</p>
                                )}
                                <button className="roster-btn">
                                    {key.replace(/\d+/g, buttonLabel)}
                                </button>
                            </div>
                        </>
                    );
                })}
        </div>
    );
};

export default Table;
