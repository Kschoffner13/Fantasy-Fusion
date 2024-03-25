import "./style.css";
import logo from "../../images/logo.png";
import { NavLink, useParams } from "react-router-dom";
import ProfileHeaderSection from "../ProfileHeaderSection/ProfileHeaderSection";
import { useEffect, useState } from "react";
import FLAccessor from "../../Accessors/FLAccessor";
import TeamAccessor from "../../Accessors/TeamAccessor";
import { getCurrentUser } from "aws-amplify/auth";

const MainHeader = () => {
    const { leagueName } = useParams();

    const [league, setLeague] = useState({});
    const [teams, setTeams] = useState([]);
    const [currentTeam, setCurrentTeam] = useState({});

    const getLeagueInfo = async () => {
        const leagueAccessor = new FLAccessor("");
        const tmp = await leagueAccessor.getFantasyLeague(leagueName);
        setLeague(tmp);
    };

    const getUserTeams = async () => {
        const teamAccessor = new TeamAccessor();
        const user = await getCurrentUser();
        const tmp = await teamAccessor.getUsersTeams(user.userId);
        const tmp2 = await teamAccessor.getLeaugesTeams(leagueName);

        for (let team of tmp2) {
            if (team.UserID === user.userId) {
                setCurrentTeam(team);
                break;
            }
        }

        setTeams(tmp);
    };

    useEffect(() => {
        getUserTeams();
    }, []);

    useEffect(() => {
        getLeagueInfo();
    }, [leagueName]);

    return (
        <header>
            <div className="header-top">
                <img className="header-logo" src={logo}></img>
                <NavLink to="/">
                    <h5>Home</h5>
                </NavLink>
                {/* <h5>My Teams</h5> MAKE THIS A DROP DOWN */}
                <div className="dropdown">
                    <button className="dropbtn">My Teams</button>
                    <div className="dropdown-content">
                        {teams.map((team) => (
                            <NavLink
                                to={`/${team.fantasyleagueID}/${team.id}`}
                                key={team.id}
                            >
                                {team.Name}
                            </NavLink>
                        ))}
                    </div>
                </div>
                <NavLink to="/">
                    <h5>How to Play</h5>
                </NavLink>
                <ProfileHeaderSection />
            </div>
            <div className="header-bot">
                <h5>{league?.Name}</h5>
                <NavLink
                    to={`/${leagueName}/${currentTeam.id}`}
                    className="active"
                >
                    My Team
                </NavLink>
                <NavLink to={`/${leagueName}/matchup`}>Matchup</NavLink>
                <NavLink to={`/${leagueName}/players`}>Free Agents</NavLink>
                <NavLink to={`/${leagueName}`}>League</NavLink>

                <h6>THIS COULD BE YOUR COMPANYS AD!</h6>
            </div>
        </header>
    );
};

export default MainHeader;
