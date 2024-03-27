import { useParams } from "react-router";
import MainHeader from "../Components/MainHeader/MainHeader";
import "../Styles/leaguePage.css";
import Table from "../Components/Table/Table";
import MatchupSnapshot from "../Components/MatchupSnapshot/MatchupSnapshot";
import { useNavigate } from "react-router-dom";
import AccessVerification from "../Helpers/AccessVerification.js";
import { getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer/Footer.js";
import FLAccessor from "../Accessors/FLAccessor.js";
import TeamAccessor from "../Accessors/TeamAccessor.js";
import SimpleTable from "../Components/Table/SimpleTable.js";

const LeaguePage = () => {
    const { leagueName } = useParams();
    const nav = useNavigate();

    const [league, setLeague] = useState({});
    const [teams, setTeams] = useState([]);

    const verifyAccess = async () => {
        const userId = (await getCurrentUser()).userId;
        const verifier = new AccessVerification(userId, leagueName);
        if (!(await verifier.verifyLeagueAccess())) {
            nav("/");
        }
    };

    const getAllLeagueInfo = async () => {
        const leagueAccessor = new FLAccessor("");
        const teamAccessor = new TeamAccessor();

        const res = await leagueAccessor.getFantasyLeague(leagueName);
        let teamRes = await teamAccessor.getLeaugesTeams(leagueName);

        // Sort teams by win percentage
        teamRes = teamRes.sort((a, b) => {
            const aWinPerc = a.Wins / (a.Wins + a.Losses + a.Draws);
            const bWinPerc = b.Wins / (b.Wins + b.Losses + b.Draws);

            // Sort in descending order
            return bWinPerc - aWinPerc;
        });

        setLeague(res);
        setTeams(teamRes);
    };

    useEffect(() => {
        console.log("teams", teams);
    }, [teams]);

    useEffect(() => {
        console.log("bother", league);
    }, [league]);

    useEffect(() => {
        verifyAccess();
        getAllLeagueInfo();
    }, []);

    return (
        <div className="league-page">
            <MainHeader />
            {/* <div className="matchup-snapshots">
                <MatchupSnapshot />
                <MatchupSnapshot />
                <MatchupSnapshot />
                <MatchupSnapshot />
                <MatchupSnapshot />
                <MatchupSnapshot />
            </div> */}
            <h1>{league.Name}</h1>
            <div className="league-tables">
                <SimpleTable
                    headers={["Name", "Wins", "Losses", "Draws"]}
                    itemList={teams}
                    showButton={false}
                />
            </div>
            <Footer />
        </div>
    );
};

export default LeaguePage;
