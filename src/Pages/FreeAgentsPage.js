import MainHeader from "../Components/MainHeader/MainHeader";
import "../Styles/freeAgentsPage.css";
import Table from "../Components/Table/Table.js";
import { useState } from "react";

const FreeAgentsPage = () => {
    const [daysBack, setDaysBack] = useState("season");
    const [league, setLeague] = useState("all");
    const [pos, setPos] = useState("all");

    return (
        <div className="fa-page">
            <MainHeader />
            <div>
                <label>
                    Days:
                    <select
                        value={daysBack}
                        onChange={(e) => setDaysBack(e.target.value)}
                    >
                        <option value="7">7</option>
                        <option value="14">14</option>
                        <option value="30">30</option>
                        <option value="season">Season</option>
                    </select>
                </label>
                <label>
                    League:
                    <select
                        value={league}
                        onChange={(e) => setLeague(e.target.value)}
                    >
                        <option value="nba">NBA</option>
                        <option value="nhl">NHL</option>
                        <option value="all">All</option>
                    </select>
                </label>
                <label>
                    Position:
                    <select
                        value={pos}
                        onChange={(e) => setPos(e.target.value)}
                    >
                        <option value="guard">Guard</option>
                        <option value="forward">Forward</option>
                        <option value="center">Center</option>
                        <option value="goalie">Goalie</option>
                        <option value="wing">Wing</option>
                        <option value="defense">D-man</option>
                        <option value="all">All</option>
                    </select>
                </label>
            </div>
            <Table
                headers={["test"]}
                roster={["test"]}
                rosterPlacement={[]}
                setRosterPlacement={null}
                filterKeys={null}
                title={"players"}
            />
        </div>
    );
};

export default FreeAgentsPage;
