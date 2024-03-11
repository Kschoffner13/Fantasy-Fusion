import "./style.css";
import logo from "../../images/logo.png";

const MatchupView = ({ team }) => {
    /*
        Team name/logo - points
        starters w/ games table
    */
    return (
        <div>
            <div>
                <div>
                    <img src={logo}></img>
                    <h3>{team.name}</h3>
                </div>
                <h1>123.45</h1>
            </div>
        </div>
    );
};

export default MatchupView;
