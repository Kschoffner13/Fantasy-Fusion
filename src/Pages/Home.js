import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import { signOut } from "aws-amplify/auth";
import { Button } from "@aws-amplify/ui-react";
import { Authenticator } from "@aws-amplify/ui-react";
import TeamAccessor from "../Accessors/TeamAccessor";
import FLAccessor from "../Accessors/FLAccessor";
import inviteClass from "../Accessors/InviteClass";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AccessVerification from "../Helpers/AccessVerification";
import MainHeader from "../Components/MainHeader/MainHeader";
import "../Styles/homePage.css";
import Footer from "../Components/Footer/Footer";

const Home = () => {
    const [leagueCode, setLeagueCode] = useState("");
    const nav = useNavigate();
    const gotoTeamCreation = () => {
        //CHECK IF CODE VALID BEFOREHAND (HANDLE IN THE NEXT PAGE)
        nav(`/${leagueCode}/createteam`);
    };

    return (
        <Authenticator>
            <div style={{ padding: "0 5%" }}>
                <MainHeader />
                <header className="App-header">
                    <img src={logo} alt="logo" className="logo-img" />
                    <p>
                        Ever think one ball wasn't enough. Now is your
                        oppurtunity to enjoy all the balls you could ever wish
                        for
                    </p>

                    <NavLink to="/createleague" className="create-league-btn">
                        CREATE LEAGUE
                    </NavLink>
                    <p>or</p>
                    <div className="home-container">
                        <input
                            type="text"
                            className="home-input"
                            onChange={(event) =>
                                setLeagueCode(event.target.value)
                            }
                            placeholder="Invite Code"
                        />
                        <button
                            className="home-button"
                            onClick={gotoTeamCreation}
                        >
                            Create Team
                        </button>
                    </div>
                </header>
                <Footer />
            </div>
        </Authenticator>
    );
};

export default Home;
