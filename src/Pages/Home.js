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

async function handleSignOut() {
    try {
        await signOut();
    } catch (error) {
        console.log("error signing out: ", error);
    }
}

async function test() {
    const teamAccessor = new TeamAccessor("123456", "123456");

    const response = await teamAccessor.getUsersTeams();
    console.log(response);
}

const Home = () => {
    const [leagueCode, setLeagueCode] = useState("");
    const nav = useNavigate();
    const gotoTeamCreation = () => {
        //CHECK IF CODE VALID BEFOREHAND

        nav(`/${leagueCode}/createteam`);
    };

    return (
        <Authenticator>
            <header className="App-header">
                <img src={logo} alt="logo" />
                <h1>Fantasy Fusion</h1>
                <p>
                    Ever think one ball wasn't enough. Now is your oppurtunity
                    to enjoy all the balls you could ever wish for
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <Button onClick={handleSignOut}>Sign Out</Button>
                <NavLink to="/abc/draft">DRAFT</NavLink>
                <NavLink to="/abc/def">TEAM</NavLink>
                <NavLink to="/abc/matchup">MATCHUP</NavLink>
                <Button onClick={test2}>test</Button>
                <NavLink to="/createleague">CREATE LEAGUE</NavLink>
                <div>
                    <input
                        type="text"
                        onChange={(event) => setLeagueCode(event.target.value)}
                    />
                    <button onClick={gotoTeamCreation}>Create Team</button>
                </div>
            </header>
        </Authenticator>
    );
};

export default Home;
