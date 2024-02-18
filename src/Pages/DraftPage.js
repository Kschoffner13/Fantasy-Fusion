import { NavLink } from "react-router-dom";
import "../Styles/draftPage.css";
import logo from "../images/logo.png";
import { useEffect, useState } from "react";
import DraftBoard from "../Components/DraftBoard/DraftBoard";

const DraftPage = () => {
    /*
        BACKEND INFORMATION:
        Grab roster/draft setttings from league
        Grab drafted players (Player name, Position, team drafted, what round they were drafted)
        Grab draftable players (Player name, Position, some kind of stats on the player (projected ideally with adp or last season stats), other player information
            - have them sorted in a meaningful way
            - 2 options -> return a big ass json with everyone draftable
                        -> or return json with 50 players at once sorted best to worst (means that searching function will be a backend functino and not frontend)
        Need a way to update user teams when player is drafted
        May/More than likely will need a draft database for keeping track of picks unless alternate method found
            - Will need to see other user picks live
            - keep track of the active pick and timeleft to pick
            - keep track of whose been drafted at which draft position
    */
    const rounds = 12;
    const [teams, setTeams] = useState([
        {
            name: "The Alchemists",
            logoUrl: "https://picsum.photos/id/12/200/200",
        },
        { name: "The Wizards", logoUrl: "https://picsum.photos/id/13/200/200" },
        {
            name: "The Highlanders",
            logoUrl: "https://picsum.photos/id/14/200/200",
        },
        {
            name: "The Pioneers",
            logoUrl: "https://picsum.photos/id/15/200/200",
        },
        {
            name: "The Gladiators",
            logoUrl: "https://picsum.photos/id/16/200/200",
        },
        {
            name: "The Conquerors",
            logoUrl: "https://picsum.photos/id/17/200/200",
        },
        { name: "The Titans", logoUrl: "https://picsum.photos/id/18/200/200" },
        { name: "The Dragons", logoUrl: "https://picsum.photos/id/19/200/200" },
        {
            name: "The Challengers",
            logoUrl: "https://picsum.photos/id/20/200/200",
        },
        {
            name: "The Avengers",
            logoUrl: "https://picsum.photos/id/21/200/200",
        },
        {
            name: "The Guardians",
            logoUrl: "https://picsum.photos/id/22/200/200",
        },
        {
            name: "The Warriors",
            logoUrl: "https://picsum.photos/id/23/200/200",
        },
    ]);

    const [timeLeft, setTimeLeft] = useState(20);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    const hrs = Math.floor(timeLeft / 3600)
        .toString()
        .padStart(2, "0");
    const mins = Math.floor((timeLeft % 3600) / 60)
        .toString()
        .padStart(2, "0");
    const secs = (timeLeft % 60).toString().padStart(2, "0");

    return (
        <div className="draft-page">
            <header>
                <img src={logo} id="logo-img" />
                <div className="name-heading">
                    <h2>Leauge Name</h2>
                    <h3>Team Name</h3>
                </div>
                <div
                    className="draft-clock"
                    id={timeLeft < 15 ? "time-alert" : ""}
                >
                    <div className="time-section">
                        <h1>{hrs}</h1>
                        <p>Hours</p>
                    </div>
                    <h1>:</h1>
                    <div className="time-section">
                        <h1>{mins}</h1>
                        <p>Minutes</p>
                    </div>
                    <h1>:</h1>
                    <div className="time-section">
                        <h1>{secs}</h1>
                        <p>Seconds</p>
                    </div>
                </div>
                <div className="pick-info">
                    <h4>You're Up in 5 picks!</h4>
                    <p>Current Pick: 1-1</p>
                    <p>Your next pick: 1-5</p>
                </div>
                <div className="profile-icon">
                    <img src="https://picsum.photos/seed/picsum/75/75" />
                    <div className="profile-icon-info">
                        <p>Profile Name</p>
                        <NavLink>Account</NavLink>
                    </div>
                </div>
            </header>
            <div className="draft-board">
                <div className="board-head">
                    {teams.map((team, index) => (
                        <div key={index} className="team-block">
                            <img src={team.logoUrl} alt={team.name} />
                            <h2>{team.name}</h2>
                        </div>
                    ))}
                </div>
                <DraftBoard rounds={rounds} teams={teams} />
            </div>
            <div>
                <div>Draftable players</div>
                <div>My Team</div>
            </div>
        </div>
    );
};

export default DraftPage;
