import { useEffect, useState } from "react";
import "./style.css";
import RosterPopup from "../RosterPopup/RosterPopup";

const Table = ({
    headers,
    roster,
    rosterPlacement,
    setRosterPlacement,
    filterKeys,
    glStats,
    title,
    hasButton = true,
}) => {
    const columnCount = hasButton ? headers.length + 1 : headers.length; // Adjust column count based on hasButton
    const gridTemplateColumns = `2fr ${"1fr ".repeat(columnCount - 1)}`;

    const [toSwap, setToSwap] = useState({ id: null, slot: null });

    const swap = (playerId, pos) => {
        setToSwap({ id: playerId, slot: pos });
        setIsOpen(true);
        //console.log(playerId, pos);
        // setRosterPlacement((prevState) => ({
        //     ...prevState,
        //     GRD1: 19,
        //     BCH5: 10,
        // }));
    };

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`table ${columnCount <= 3 ? "utl-table" : ""} ${
                columnCount > 3 && columnCount < 12 ? "league-table" : ""
            }`}
        >
            <h3>{title}</h3>
            {isOpen ? (
                <RosterPopup
                    roster={roster}
                    rosterPlacement={rosterPlacement}
                    setRosterPlacement={setRosterPlacement}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    toSwap={toSwap}
                />
            ) : null}
            <div
                className="header"
                style={{ gridTemplateColumns: gridTemplateColumns }}
            >
                {headers.map((col, index) => (
                    <div key={index}>{col}</div>
                ))}
                {hasButton && <div className="extra-column"></div>}
            </div>
            {Object.keys(rosterPlacement)
                .filter((key) =>
                    filterKeys.some((filterKey) => key.startsWith(filterKey))
                )
                .map((key, index) => {
                    const p = roster.find(
                        (player) => player.player_id === rosterPlacement[key]
                    );
                    const player = p?.stats;
                    //console.log("OKASAFAUFY", player);
                    return (
                        <>
                            {key.startsWith("GL") && (
                                <div className="header gl-header">
                                    {glStats.map((stat, index) => (
                                        <div key={index}>{stat}</div>
                                    ))}
                                    {hasButton && (
                                        <div className="extra-column"></div>
                                    )}{" "}
                                </div>
                            )}
                            <div key={index} className="row">
                                {player ? (
                                    key.startsWith("GL") ? (
                                        glStats.map((stat, index) => (
                                            <div key={index}>
                                                {stat == "name" ? (
                                                    <div className="player-basic-bio">
                                                        <h5>
                                                            {player[stat]} - pos
                                                        </h5>
                                                        <h6>A - pos</h6>
                                                        <p>A vs B @ 5:00pm</p>
                                                    </div>
                                                ) : (
                                                    player[stat] || "-"
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        headers.map((col, index) => (
                                            <div key={index}>
                                                {col == "name" ? (
                                                    <div className="player-basic-bio">
                                                        <h5>
                                                            {player[col]} - pos
                                                        </h5>
                                                        <h6>A - pos</h6>
                                                        <p>A vs B @ 5:00pm</p>
                                                    </div>
                                                ) : (
                                                    player[col] || "-"
                                                )}
                                            </div>
                                        ))
                                    )
                                ) : (
                                    <p>-</p>
                                )}
                                {hasButton && ( // Conditionally render button
                                    <button
                                        className="roster-btn"
                                        onClick={() =>
                                            swap(
                                                player.id,
                                                key.replace(/\d+/g, "")
                                            )
                                        }
                                    >
                                        {key.replace(/\d+/g, "")}
                                    </button>
                                )}
                            </div>
                        </>
                    );
                })}
        </div>
    );
};

export default Table;
