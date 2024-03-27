import "./style.css";
import { useEffect, useState } from "react";

const DraftPane = ({ players }) => {
    const [option, setOption] = useState("all");
    const [filteredPlayers, setFilteredPlayers] = useState([]);

    useEffect(() => {
        if (option == "all" || !players) {
            setFilteredPlayers(players);
        } else {
            const filtered = players.filter(
                (player) => player.league.toLowerCase() === option
            );

            setFilteredPlayers(filtered);
        }
    }, [option, players]);

    return (
        <div className="draft-pane">
            <div className="draft-options">
                <div
                    className={option == "all" ? "active" : ""}
                    onClick={() => setOption("all")}
                >
                    All
                </div>
                <div
                    className={option == "nba" ? "active" : ""}
                    onClick={() => setOption("nba")}
                >
                    NBA
                </div>
                <div
                    className={option == "nhl" ? "active" : ""}
                    onClick={() => setOption("nhl")}
                >
                    NHL
                </div>
                <div></div>
            </div>
            <div className="player-box">
                <div className="player-draft-info draft-info-head">
                    <h2>Name</h2>
                    <p>League</p>
                    <p>Stats</p>
                    <p>FP&#9660;</p>
                </div>
                {filteredPlayers.map((player, index) => (
                    <div
                        key={index}
                        className={`player-draft-info ${
                            index % 2 ? "" : "dark-row"
                        }`}
                    >
                        <h2>{player.name}</h2>
                        <p>{player.league}</p>
                        {Object.entries(player).map(([key, value]) => {
                            if (
                                key !== "name" &&
                                key !== "team" &&
                                key != "league"
                            ) {
                                return (
                                    <p key={key}>
                                        {key}: {value}
                                    </p>
                                );
                            }
                            return null;
                        })}
                        <p>200</p>
                        <button>+</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DraftPane;
