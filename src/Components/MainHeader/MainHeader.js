import "./style.css";
import logo from "../../images/logo.png";
import { NavLink } from "react-router-dom";
import ProfileHeaderSection from "../ProfileHeaderSection/ProfileHeaderSection";

const MainHeader = () => {
    const teamName = "myTeam";
    const leagueName = "myLeague";

    return (
        <header>
            <div className="header-top">
                <img className="header-logo" src={logo}></img>
                <NavLink to="/home">
                    <h5>Home</h5>
                </NavLink>
                <h5>My Teams</h5> {/*MAKE THIS A DROP DOWN*/}
                <NavLink to="/help">
                    <h5>How to Play</h5>
                </NavLink>
                <ProfileHeaderSection />
            </div>
            <div className="header-bot">
                <h5>League Name</h5>
                <NavLink to={`/${leagueName}/${teamName}`} className="active">
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
