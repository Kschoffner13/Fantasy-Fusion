import "./style.css";
import { useEffect, useState } from "react";
import Table from "../Table/Table.js";

const RosterSection = ({ team }) => {
    console.log("ROS SECT", team);
    const [roster, setRoster] = useState([]);

    const [rosterPlacement, setRosterPlacement] = useState({});

    useEffect(() => {
        setRosterPlacement(team.CurrentLineup);
    }, [team]);

    useEffect(() => {
        console.log("ROSTER PLACEMENT UPDATEED", rosterPlacement);
        let ids = [];
        if (rosterPlacement) {
            for (let [key, value] of Object.entries(rosterPlacement)) {
                if (value) {
                    ids.push(value);
                }
            }
        }
        console.log("IDS", ids, rosterPlacement);
        getPlayers(ids);
    }, [rosterPlacement]);

    const getPlayers = async (ids) => {
        ids = ids.filter((item) => item !== null);
        if (ids.length <= 0) {
            return;
        }
        const list_string = ids.join(",");
        const date = getFormattedDate(currentDate);
        await fetch(
            `https://m3nosbczqoii3uygdwrpx4djbq0eakbp.lambda-url.ca-central-1.on.aws/?date=${date}&roster=[${list_string}]`
        );
        console.log(list_string, date);
    };

    useEffect(() => {
        console.log("ROSTER", roster);
    }, [roster]);

    const colsB = ["name", "GP", "PPG", "APG", "RPG", "FP"];
    const colsH = ["name", "GP", "P", "G", "A", "FPPG"];
    const colsU = ["name", "FPPG"];
    const glStats = ["name", "GP", "W", "L", "SV", "FPPG"];
    const combined = [...new Set([...colsB, ...colsH, ...glStats])];

    const [currentDate, setCurrentDate] = useState(new Date());
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
