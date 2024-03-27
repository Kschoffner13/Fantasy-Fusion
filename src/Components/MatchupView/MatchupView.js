import "./style.css";
import logo from "../../images/logo.png";
import Table from "../Table/Table.js";
import { useEffect, useState } from "react";

const MatchupView = ({ team, score, reversed = false }) => {
    /*
        Team name/logo - points
        starters w/ games table
    */

    const [roster, setRoster] = useState([]);
    const [rosterPlacement, setRosterPlacement] = useState([]);

    function getFormattedDate(date, format = "YYYY-MM-DD") {
        const year = date.getFullYear();
        let month = date.getMonth() + 1; // Months are zero based
        let day = date.getDate();

        // Pad month and day with zero if needed
        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;

        if (format === "YYYY-MM-DD") {
            return `${year}-${month}-${day}`;
        } else if (format === "MM-DD-YYYY") {
            return `${month}-${day}-${year}`;
        } else {
            return date.toString();
        }
    }

    const getPlayers = async (ids) => {
        ids = ids.filter((item) => item !== null);
        if (ids.length <= 0) {
            return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const date = getFormattedDate(yesterday);

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

    const getLineup = (team) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split("T")[0];

        let lineup;
        if (team.Lineups[yesterdayString]) {
            lineup = Object.values(team.Lineups[yesterdayString]);
            setRosterPlacement(team.Lineups[yesterdayString]);
        } else {
            lineup = Object.values(team.CurrentLineup);
            setRosterPlacement(team.CurrentLineup);
        }

        return lineup.filter((player) => player !== null);
    };

    useEffect(() => {
        //get all players yesterday
        if (team && Object.keys(team).length > 0) {
            getPlayers(getLineup(team));
        }
    }, [team]);

    // useEffect(() => {
    //     console.log(roster);
    // }, [roster]);

    return (
        <div className="matchup-view">
            <div
                className="score-header"
                style={reversed ? { flexDirection: "row-reverse" } : {}}
            >
                <div className="team-header">
                    <img src={logo}></img>
                    <h3>{team?.Name}</h3>
                </div>
                <h1>{score}</h1>
            </div>
            <Table
                headers={["name", "FP"]}
                roster={roster}
                rosterPlacement={rosterPlacement}
                setRosterPlacement={null}
                filterKeys={["GRD", "FWD", "CB", "SM"]}
                glStats={null}
                hasButton={false}
            />
            <Table
                headers={["name", "FP"]}
                roster={roster}
                rosterPlacement={rosterPlacement}
                setRosterPlacement={null}
                filterKeys={["CH", "WNG", "DEF", "GL"]}
                glStats={["name", "FP"]}
                hasButton={false}
            />
            <Table
                headers={["name", "FP"]}
                roster={roster}
                rosterPlacement={rosterPlacement}
                filterKeys={["UTL"]}
                setRosterPlacement={null}
                glStats={null}
                hasButton={false}
            />
        </div>
    );
};

export default MatchupView;
