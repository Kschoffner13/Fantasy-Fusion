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

async function handleSignOut() {
    try {
        await signOut();
    } catch (error) {
        console.log("error signing out: ", error);
    }
}

async function test() {
    const teamAccessor = new TeamAccessor("123456", "123456");

    // const response = await teamAccessor.getUsersTeams();
    // console.log(response);
    const FLA = new FLAccessor("654321");

    const response = await FLA.checkIfPlayerDrafted(
        "NBAdoncilu01",
        "1cb1b891-0b06-48e4-a843-3ed8ed0b7ecf"
    );

    console.log(response);
}

async function test2() {
    const I = new inviteClass();
    const response = await I.sendInvite("kschoffner@gmail.com");
    console.log(response);
}

const Home = () => {
    const [leagueCode, setLeagueCode] = useState("");
    const nav = useNavigate();
    const gotoTeamCreation = () => {
        //CHECK IF CODE VALID BEFOREHAND

        nav(`/${leagueCode}/createteam`);
    };

    const [userId, setUserId] = useState("");
    const [teamId, setTeamId] = useState("");
    const [leagueId, setLeagueId] = useState("");

    const accessVerificationTest = async () => {
        const verifier = new AccessVerification(userId, leagueId);
        const res = await verifier.verifyLeagueAccess();
        console.log(res);
    };

    return (
        <Authenticator>
            <MainHeader />
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
                <Button onClick={test}>test</Button>
                <NavLink to="/createleague">CREATE LEAGUE</NavLink>
                <div>
                    <input
                        type="text"
                        onChange={(event) => setLeagueCode(event.target.value)}
                    />
                    <button onClick={gotoTeamCreation}>Create Team</button>
                </div>
                <div>
                    <h3>ACCESS VERIFICATION TEST</h3>
                    <input
                        type="text"
                        placeholder="User ID"
                        value={userId}
                        onChange={(event) => setUserId(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Team ID"
                        value={teamId}
                        onChange={(event) => setTeamId(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="League ID"
                        value={leagueId}
                        onChange={(event) => setLeagueId(event.target.value)}
                    />
                    <button onClick={accessVerificationTest}>Submit</button>
                </div>
            </header>
        </Authenticator>
    );
};

export default Home;
