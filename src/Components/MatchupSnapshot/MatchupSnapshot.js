import "./style.css";
import logo from "../../images/logo.png";

const MatchupSnapshot = () => {
    return (
        <div className="matchup-snapshot">
            <h5>Week 14</h5>
            <div className="snapshot-teams">
                <h4>My Team (2nd)</h4>
                <h4>Other Team (4th)</h4>
            </div>
            <div className="snapshot-scoreboard">
                <div className="snapshot-score">
                    <img src={logo}></img>
                    <h3>123.45</h3>
                </div>
                <h5>vs</h5>
                <div className="snapshot-score">
                    <h3>321.69</h3>
                    <img src={logo}></img>
                </div>
            </div>
            <h6>Last Week: (W) 654 - 234</h6>
        </div>
    );
};

export default MatchupSnapshot;
