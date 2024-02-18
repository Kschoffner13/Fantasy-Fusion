import { NavLink } from "react-router-dom";
import "../Styles/draftPage.css";
import logo from "../images/logo.png";
import { useEffect, useState } from "react";

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
                <div className="draft-clock">
                    <h1>{hrs}</h1>
                    <h1>:</h1>
                    <h1>{mins}</h1>
                    <h1>:</h1>
                    <h1>{secs}</h1>
                </div>
                <div className="profile-icon">
                    <img src="https://picsum.photos/seed/picsum/75/75" />
                    <div>
                        <p>Profile Name</p>
                        <NavLink>Account</NavLink>
                    </div>
                </div>
            </header>
            <div>
                <h1 onClick={() => setTimeLeft(3600)}>Draft Board</h1>
            </div>
            <div>
                <div>Draftable players</div>
                <div>My Team</div>
            </div>
        </div>
    );
};

export default DraftPage;
