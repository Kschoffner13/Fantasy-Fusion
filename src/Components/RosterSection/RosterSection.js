import "./style.css";
import { useEffect, useState } from "react";
import Table from "../Table/Table.js";

const RosterSection = ({ team }) => {
    console.log("ROS SECT", team);
    const [roster, setRoster] = useState([]);

    const [rosterPlacement, setRosterPlacement] = useState({});

    useEffect(() => {
        setRosterPlacement(team.Lineup);
    }, [team]);

    useEffect(() => {
        console.log("ROSTER PLACEMENT UPDATEED", rosterPlacement);
        let ids = [];
        if (rosterPlacement) {
            for (let [key, value] of Object.entries(rosterPlacement)) {
                ids.push(value);
            }
        }
        console.log("IDS", ids, rosterPlacement);
        getPlayers(ids);
    }, [rosterPlacement]);

    const getPlayers = async (ids) => {
        if (ids === undefined) {
            return;
        }
        console.log(ids);
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
