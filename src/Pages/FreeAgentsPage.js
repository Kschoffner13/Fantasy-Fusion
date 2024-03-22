import MainHeader from "../Components/MainHeader/MainHeader";
import "../Styles/freeAgentsPage.css";
import Table from "../Components/Table/Table.js";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer/Footer.js";
import SimpleTable from "../Components/Table/SimpleTable.js";
import { useParams } from "react-router-dom";
import TeamAccessor from "../Accessors/TeamAccessor.js";
import { getCurrentUser } from "aws-amplify/auth";

const FreeAgentsPage = () => {
    const { leagueName } = useParams();

    const [daysBack, setDaysBack] = useState("season");
    const [league, setLeague] = useState("all");
    const [pos, setPos] = useState("all");

    const [nbaFA, setNbaFA] = useState([]);
    const [nhlFA, setNhlFA] = useState([]);
    const [filteredFa, setFilteredFa] = useState([]);

    const getFA = async () => {
        const resNBA = await fetch(
            "https://mhiakrcyoj.execute-api.ca-central-1.amazonaws.com/dev"
        );
        const resNHL = await fetch(
            "https://v18r7qllfj.execute-api.ca-central-1.amazonaws.com/dev"
        );
        const dataNBA = await resNBA.json();
        const dataNHL = await resNHL.json();

        setNbaFA(JSON.parse(dataNBA.body));
        setNhlFA(JSON.parse(dataNHL.body));

        setFilteredFa(
            JSON.parse(dataNBA.body).concat(JSON.parse(dataNHL.body))
        );
    };

    useEffect(() => {
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
        console.log("teams", userTeam.Lineup);

        // Create a copy of userTeam
        let userTeamCopy = { ...userTeam };
        // Create a copy of userTeam.Lineup
        userTeamCopy.Lineup = { ...userTeam.Lineup };
        // Modify the copy
        userTeamCopy.Lineup.BCH1 = playerId;

        console.log("TO UPLOAD", userTeamCopy.Lineup);
        await teamAccessor.updateTeam(userTeam.id, {
            Lineup: userTeamCopy.Lineup,
        });

        //remove player from pool
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
                itemList={filteredFa}
                showButton={true}
                buttonFunction={addPlayer}
            />
            <Footer />
        </div>
    );
};

export default FreeAgentsPage;
