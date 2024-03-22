import MainHeader from "../Components/MainHeader/MainHeader";
import "../Styles/freeAgentsPage.css";
import Table from "../Components/Table/Table.js";
import { useState } from "react";
import Footer from "../Components/Footer/Footer.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AccessVerification from "../Helpers/AccessVerification.js";
import { getCurrentUser } from "aws-amplify/auth";
import { useEffect } from "react";

const FreeAgentsPage = () => {
    const [daysBack, setDaysBack] = useState("season");
    const [league, setLeague] = useState("all");
    const [pos, setPos] = useState("all");

    const { leagueName } = useParams();
    const nav = useNavigate();

    const verifyAccess = async () => {
        const userId = (await getCurrentUser()).userId;
        const verifier = new AccessVerification(userId, leagueName);
        if (!(await verifier.verifyLeagueAccess())) {
            nav("/");
        }
    };

    useEffect(() => {
        verifyAccess();
    }, []);

    return (
        <div className="fa-page">
            <MainHeader />
            <div className="filters">
                <div className="days-back-filter">
                    <p>Days:</p>
                    <button
                        className={daysBack === "7" ? "active" : ""}
                        onClick={() => setDaysBack("7")}
                    >
                        7
                    </button>
                    <button
                        className={daysBack === "14" ? "active" : ""}
                        onClick={() => setDaysBack("14")}
                    >
                        14
                    </button>
                    <button
                        className={daysBack === "30" ? "active" : ""}
                        onClick={() => setDaysBack("30")}
                    >
                        30
                    </button>
                    <button
                        className={daysBack === "season" ? "active" : ""}
                        onClick={() => setDaysBack("season")}
                    >
                        23/24
                    </button>
                </div>
                <div className="league-filter">
                    <p>League:</p>
                    <select
                        value={league}
                        onChange={(e) => setLeague(e.target.value)}
                    >
                        <option value="nba">NBA</option>
                        <option value="nhl">NHL</option>
                        <option value="all">All</option>
                    </select>
                </div>
                <div className="position-filter">
                    <p>Position:</p>
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
                </div>
            </div>
            <Table
                headers={["test"]}
                roster={["test"]}
                rosterPlacement={[]}
                setRosterPlacement={null}
                filterKeys={null}
                title={"Free Agents"}
            />
            <Footer />
        </div>
    );
};

export default FreeAgentsPage;
