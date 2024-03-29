import "./style.css";
import { useEffect, useState } from "react";
import Table from "../Table/Table.js";
import TeamAccessor from "../../Accessors/TeamAccessor.js";

const RosterSection = ({ team, getTeam }) => {
    // console.log("ROS SECT", team);
    const [roster, setRoster] = useState([]);
    const [rosterPlacement, setRosterPlacement] = useState({});
    const [currentDate, setCurrentDate] = useState(new Date()); //change to current date "2024-03-22"

    useEffect(() => {
        if (team && team.Lineups && team.Lineups[formatDate(currentDate)]) {
            setRosterPlacement(team.Lineups[formatDate(currentDate)]);
        } else if (team && team.CurrentLineup) {
            // console.log("ELSE");
            setRosterPlacement(team.CurrentLineup);
        }
        //setRosterPlacement(team?.CurrentLineup);
    }, [team]);

    // useEffect(() => {
    //     console.log("ROSTER PLACEMENT UPDATEED", rosterPlacement);
    //     let ids = [];
    //     if (rosterPlacement) {
    //         for (let [key, value] of Object.entries(rosterPlacement)) {
    //             if (value) {
    //                 ids.push(value);
    //             }
    //         }
    //     }
    //     console.log("IDS", ids, rosterPlacement);
    //     getPlayers(ids);
    // }, [rosterPlacement]);

    useEffect(() => {
        // console.log("Date changed", currentDate);
        let ids = [];
        if (rosterPlacement && Object.keys(rosterPlacement).length !== 0) {
            for (let [key, value] of Object.entries(rosterPlacement)) {
                if (value) {
                    ids.push(value);
                }
            }
            getPlayers(ids);
        }
        // console.log("IDS", ids, rosterPlacement);
    }, [rosterPlacement, currentDate]);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based in JavaScript
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        if (rosterPlacement && Object.keys(rosterPlacement).length > 0) {
            // console.log("MOTHERFUCK", rosterPlacement);
            // console.log("MADE IT", rosterPlacement);
            updateLineup();
        }

        getTeam();
        if (team && team.Lineups && team.Lineups[formatDate(currentDate)]) {
            setRosterPlacement(team.Lineups[formatDate(currentDate)]);
        } else if (team && team.CurrentLineup) {
            // console.log("ELSE");
            setRosterPlacement(team.CurrentLineup);
        }
    }, [currentDate]);

    const updateLineup = async () => {
        const teamAccessor = new TeamAccessor();
        const res = await teamAccessor.setLineup(
            team.id,
            currentDate,
            rosterPlacement
        );
        // console.log("FUCK", res);
    };

    useEffect(() => {
        // if (rosterPlacement && Object.keys(rosterPlacement).length > 0) {
        //     // console.log("MOTHERFUCK", rosterPlacement);
        //     // console.log("MADE IT", rosterPlacement);
        //     updateLineup();
        // }
        // getTeam();
    }, [rosterPlacement]);

    const getPlayers = async (ids) => {
        ids = ids.filter((item) => item !== null);
        if (ids.length <= 0) {
            return;
        }

        const date = getFormattedDate(currentDate);

        // Group ids into chunks of 4
        const idChunks = [];
        for (let i = 0; i < ids.length; i += 4) {
            idChunks.push(ids.slice(i, i + 4));
        }
        // console.log
        const fetchPlayers = idChunks.map((idChunk) =>
            fetch(
                `https://m3nosbczqoii3uygdwrpx4djbq0eakbp.lambda-url.ca-central-1.on.aws/?date=${date}&roster=[${idChunk
                    .map((id) => `"${id}"`)
                    .join(",")}]`
            )
        );

        const responses = await Promise.all(fetchPlayers);

        for (const res of responses) {
            if (res.ok) {
                const players = await res.json();
                for (const player of players) {
                    setRoster((prevPlayers) => {
                        // If the player is already in the roster, update the player
                        if (
                            prevPlayers.find(
                                (p) => p.player_id === player.player_id
                            )
                        ) {
                            return prevPlayers.map((p) =>
                                p.player_id === player.player_id ? player : p
                            );
                        } else {
                            // If not, add the player to the roster
                            return [...prevPlayers, player];
                        }
                    });
                }
            } else {
                console.log("Error Accessing Database", res);
            }
        }
    };

    // useEffect(() => {
    //     console.log("ROSTER", roster);
    // }, [roster]);

    const colsB = ["name", "Pts", "Ast", "Rbs", "FP"];
    const colsH = ["name", "G", "Ast", "FP"];
    const colsU = ["name", "FP"];
    const glStats = ["name", "FP"];
    const combined = [...new Set([...colsB, ...colsH, ...glStats])];

    const goBackOneDay = () => {
        setCurrentDate((prevDate) => {
            let newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() - 1);
            return newDate;
        });
    };

    const goForwardOneDay = () => {
        setCurrentDate((prevDate) => {
            let newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + 1);
            return newDate;
        });
    };

    const getFormattedDate = (date) => {
        let year = date.getFullYear();
        let month = date.getMonth() + 1; // getMonth() returns month index starting from 0
        let day = date.getDate();

        // Pad month and day with 0 if they are less than 10
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        return `${year}-${month}-${day}`;
    };

    return (
        <div className="roster-section">
            <div className="date-selector">
                <button onClick={goBackOneDay}>&#9667;</button>
                <p>{currentDate.toLocaleDateString()}</p>
                <button onClick={goForwardOneDay}>&#9657;</button>
            </div>
            {roster && rosterPlacement ? (
                <div className="active-section">
                    <Table
                        headers={colsB}
                        roster={roster}
                        rosterPlacement={rosterPlacement}
                        filterKeys={["GRD", "FWD", "CB", "SM"]}
                        setRosterPlacement={setRosterPlacement}
                        glStats={null}
                        title={"NBA Starters"}
                    />

                    <Table
                        headers={colsU}
                        roster={roster}
                        rosterPlacement={rosterPlacement}
                        filterKeys={["UTL"]}
                        setRosterPlacement={setRosterPlacement}
                        glStats={null}
                        title={"Utility"}
                    />

                    <Table
                        headers={colsH}
                        roster={roster}
                        rosterPlacement={rosterPlacement}
                        filterKeys={["CH", "WNG", "DEF", "GL"]}
                        setRosterPlacement={setRosterPlacement}
                        glStats={glStats}
                        title={"NHL Starters"}
                    />
                </div>
            ) : (
                ""
            )}

            <div className="bench-section">
                {roster && rosterPlacement ? (
                    <Table
                        headers={combined}
                        roster={roster}
                        rosterPlacement={rosterPlacement}
                        filterKeys={["BCH"]}
                        setRosterPlacement={setRosterPlacement}
                        glStats={null}
                        title={"Bench"}
                    />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default RosterSection;
