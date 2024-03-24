import "../Styles/teamPage.css";
import logo from "../images/logo.png";
import MainHeader from "../Components/MainHeader/MainHeader.js";
import RosterSection from "../Components/RosterSection/RosterSection.js";
import Footer from "../Components/Footer/Footer.js";
import MatchupSnapshot from "../Components/MatchupSnapshot/MatchupSnapshot.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import AccessVerification from "../Helpers/AccessVerification.js";
import { useNavigate } from "react-router-dom";
import TeamAccessor from "../Accessors/TeamAccessor.js";
import { toBeEnabled } from "@testing-library/jest-dom/matchers.js";

const TeamPage = () => {
    const { leagueName, teamName } = useParams();
    const nav = useNavigate();
    const [user, setUser] = useState({});
    const [team, setTeam] = useState({ Name: "" });

    const verifyAccess = async () => {
        setUser(await fetchUserAttributes());
        const userId = (await getCurrentUser()).userId;
        const verifier = new AccessVerification(userId, leagueName);
        if (!(await verifier.verifyTeamAccess(teamName))) {
            if (!(await verifier.verifyLeagueAccess())) {
                nav("/");
            } else {
                nav(`/${leagueName}`);
            }
        }
    };

    const getTeam = async () => {
        const teamAccessor = new TeamAccessor();
        const tmp = await teamAccessor.getTeamById(teamName);
        setTeam(tmp);
    };

    useEffect(() => {
        verifyAccess();
        getTeam();
    }, []);

    useEffect(() => {
        console.log(user);
        console.log("REAK TEANM", team);
    }, [user]);

    return (
        <div className="league-page">
            <MainHeader />
            <div className="team-info-section">
                <div className="team-info-block">
                    <img src={logo}></img>
                    <div className="team-info-text">
                        <h1>
                            {team.Name.length > 10
                                ? team.Name.substring(0, 10) + "..."
                                : team.Name}
                        </h1>
                        <div className="team-record-info">
                            <h2>2nd Place</h2>
                            <h3>
                                Record: <span>{team.Wins}</span> -{" "}
                                <span>{team.Losses}</span> -
                                <span> {team.Draws}</span>
                            </h3>
                        </div>
                        <p>Owner: {user.preferred_username}</p>
                    </div>
                </div>
                <MatchupSnapshot />
            </div>
            <RosterSection />
            <Footer />
        </div>
    );
};

export default TeamPage;
