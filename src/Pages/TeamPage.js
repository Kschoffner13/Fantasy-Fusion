import { Route, Routes } from "react-router";
import ProfileHeaderSection from "../Components/ProfileHeaderSection/ProfileHeaderSection.js";
import "../Styles/teamPage.css";
import logo from "../images/logo.png";
import Home from "./Home.js";
import { HashRouter, NavLink } from "react-router-dom";
import { useState } from "react";

const TeamPage = () => {
    const teamName = "myTeam";
    const leagueName = "myLeague";

    return (
        <div className="league-page">
            <header>
                <div className="header-top">
                    <img className="header-logo" src={logo}></img>
                    <NavLink to="/">
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
                    <NavLink to={`/${leagueName}/${teamName}`}>My Team</NavLink>
                    <NavLink to={`/${leagueName}/${teamName}/matchup`}>
                        Matchup
                    </NavLink>
                    <NavLink to={`/${leagueName}/${teamName}/players`}>
                        Free Agents
                    </NavLink>
                    <NavLink to={`/${leagueName}`}>League</NavLink>

                    <h6>THIS COULD BE YOUR COMPANYS AD!</h6>
                </div>
            </header>
        </div>
    );
};

export default TeamPage;
