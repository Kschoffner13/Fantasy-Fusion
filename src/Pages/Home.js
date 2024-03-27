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

async function handleSignOut() {
    try {
        await signOut();
    } catch (error) {
        console.log("error signing out: ", error);
    }
}

async function test() {
    const FLA = new FLAccessor("3c4d45b8-20e1-702a-9302-09873f8e9c8a");

    const sch = await FLA.makeSchedule(
        "086ff1a8-ebe7-4eaa-8f4d-522afc082bba",
        new Date(2024, 1, 15),
        new Date(2024, 2, 22)
    );

    await FLA.updateFantasyLeague("086ff1a8-ebe7-4eaa-8f4d-522afc082bba", {
        Schedule: sch,
    });
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
            <div style={{ padding: "0 5%" }}>
                <MainHeader />
                <header className="App-header">
                    <img src={logo} alt="logo" />
                    <h1>Fantasy Fusion</h1>
                    <p>
                        Ever think one ball wasn't enough. Now is your
                        oppurtunity to enjoy all the balls you could ever wish
                        for
                    </p>

                    <NavLink to="/createleague">CREATE LEAGUE</NavLink>
                    <div>
                        <input
                            type="text"
                            onChange={(event) =>
                                setLeagueCode(event.target.value)
                            }
                        />
                        <button onClick={gotoTeamCreation}>Create Team</button>
                    </div>
                </header>
            </div>
            <Footer />
        </Authenticator>
    );
};

export default Home;
