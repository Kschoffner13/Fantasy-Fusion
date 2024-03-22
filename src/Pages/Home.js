import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import { signOut } from "aws-amplify/auth";
import { Button } from "@aws-amplify/ui-react";
import FLAccessor from "../Accessors/FLAccessor";
import inviteClass from "../Accessors/InviteClass";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AccessVerification from "../Helpers/AccessVerification";

async function handleSignOut() {
    try {
        await signOut();
    } catch (error) {
        console.log("error signing out: ", error);
    }
}

async function test() {
    const FLA = new FLAccessor("654321");

    const newL = {
        Name: "Best League Ever",

        Properties: { property1: "value1", property2: "value2" },
        DraftDate: Date.now(),
        TradeDeadline: Date.now(),
        PlayoffStartDate: Date.now(),
        PlayoffTeams: 8,
        PlayoffMatchupLength: 2,
        WeeklyPickups: 5,
        VetoVoteEnabled: true,

        Schedule: { week1: "Team1 vs Team2", week2: "Team3 vs Team4" },
    };
    const response1 = await FLA.saveFantasyLeague(
        newL.Name,
        newL.Properties,
        newL.DraftDate,
        newL.TradeDeadline,
        newL.PlayoffStartDate,
        newL.PlayoffTeams,
        newL.PlayoffMatchupLength,
        newL.WeeklyPickups,
        newL.VetoVoteEnabled,
        newL.Schedule
    );

    const response2 = await FLA.updateFantasyLeague(
        "1cb1b891-0b06-48e4-a843-3ed8ed0b7ecf",
        {
            Name: "Second best",
            VetoVoteEnabled: false,
            Schedule: { week1: "Team1 vs Team2", week2: "Team3 vs Team4" },
        }
    );
    console.log(response1);
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
        const res = await verifier.verifyTeamAccess(teamId);
        console.log(res);
    };

    return (
        <header className="App-header">
            <img src={logo} alt="logo" />
            <h1>Fantasy Fusion</h1>
            <p>
                Ever think one ball wasn't enough. Now is your oppurtunity to
                enjoy all the balls you could ever wish for
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
    );
};

export default Home;
