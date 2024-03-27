import MainHeader from "../Components/MainHeader/MainHeader";
import "../Styles/freeAgentsPage.css";
import Table from "../Components/Table/Table.js";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer/Footer.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AccessVerification from "../Helpers/AccessVerification.js";
import { getCurrentUser } from "aws-amplify/auth";
import SimpleTable from "../Components/Table/SimpleTable.js";
import TeamAccessor from "../Accessors/TeamAccessor.js";

const FreeAgentsPage = () => {
    const { leagueName } = useParams();

    const [daysBack, setDaysBack] = useState("season");
    const [league, setLeague] = useState("all");
    const [pos, setPos] = useState("all");

    const nav = useNavigate();

    const verifyAccess = async () => {
        const userId = (await getCurrentUser()).userId;
        const verifier = new AccessVerification(userId, leagueName);
        if (!(await verifier.verifyLeagueAccess())) {
            nav("/");
        }
    };

    const [nbaFA, setNbaFA] = useState([]);
    const [nhlFA, setNhlFA] = useState([]);
    const [filteredFa, setFilteredFa] = useState([]);

    const getFA = async () => {
        const resNBA = await fetch(
            `https://mhiakrcyoj.execute-api.ca-central-1.amazonaws.com/dev/?fantasy_id=${leagueName}`
        );
        const resNHL = await fetch(
            `https://v18r7qllfj.execute-api.ca-central-1.amazonaws.com/dev/?fantasy_id=${leagueName}`
        );
        const dataNBA = await resNBA.json();
        const dataNHL = await resNHL.json();
        console.log(dataNBA);
        setNbaFA(JSON.parse(dataNBA.body));
        setNhlFA(JSON.parse(dataNHL.body));

        setFilteredFa(
            JSON.parse(dataNBA.body).concat(JSON.parse(dataNHL.body))
        );
    };

    useEffect(() => {
        verifyAccess();
        getFA();
    }, []);

    const addPlayer = async (playerId) => {
        console.log(playerId, leagueName);
        //get team
        const teamAccessor = new TeamAccessor();
        const teams = Object.values(
            await teamAccessor.getLeaugesTeams(leagueName)
        );
        const user = await getCurrentUser();
        let userTeam = await teams.find((team) => user.userId === team.UserID);

        console.log("teams", userTeam, user);
        //add player id to roster
        console.log("teams", userTeam.CurrentLineup);

        // Create a copy of userTeam
        let userTeamCopy = { ...userTeam };
        // Create a copy of userTeam.Lineup
        userTeamCopy.CurrentLineup = { ...userTeam.CurrentLineup };
        //const dayLineup = {}
        // Modify the copy
        let playerAdded = false;
        for (let [key, value] of Object.entries(userTeamCopy.CurrentLineup)) {
            if (key.startsWith("BCH") && value === null) {
                userTeamCopy.CurrentLineup[key] = playerId;
                playerAdded = true;
                break;
            }
        }

        if (!playerAdded) {
            alert(
                "Make sure you have a open spot on your bench before adding a player"
            );
            return;
        }
        console.log("ADDED", userTeamCopy);

        const today = new Date();
        const date = `${today.getFullYear()}-${String(
            today.getMonth() + 1
        ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        console.log("FUTURE", userTeamCopy.Lineups);

        for (let date in userTeamCopy.Lineups) {
            if (date >= today) {
                for (let position in userTeamCopy.Lineups[date]) {
                    if (
                        position.startsWith("BCH") &&
                        userTeamCopy.Lineups[date][position] === null
                    ) {
                        userTeamCopy.Lineups[date][position] = playerId;
                        break;
                    }
                }
            }
        }
        console.log("FUTURE", userTeamCopy.Lineups);
        await teamAccessor.updateTeam(userTeamCopy.id, {
            CurrentLineup: userTeamCopy.CurrentLineup,
            Lineups: userTeamCopy.Lineups,
        });
        await teamAccessor.setLineup(
            userTeam.id,
            date,
            userTeamCopy.CurrentLineup
        );
        window.location.reload();
    };

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
            <SimpleTable
                headers={["name", "FP"]}
                itemList={
                    league === "nba"
                        ? nbaFA
                        : league === "nhl"
                        ? nhlFA
                        : filteredFa
                }
                showButton={true}
                buttonFunction={addPlayer}
            />
            <Footer />
        </div>
    );
};

export default FreeAgentsPage;
