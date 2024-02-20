import "./style.css";
import logo from "../../images/logo.png";

const TeamPane = ({ format, teams }) => {
    console.log(Object.keys(format).length);

    let total = 0;

    return (
        <div className="team-section">
            <select className="team-select">
                {teams.map((team, index) => (
                    <option key={index} value={team.name}>
                        {team.name}
                    </option>
                ))}
            </select>
            <div className="roster-spot roster-head">
                <p style={{ marginLeft: "10px" }}>POS</p>
                <p>Player</p>
                <h5>Stat</h5>
            </div>
            {Object.entries(format).map(([key, value]) =>
                Array.from({ length: value }).map((_, i) => (
                    <div
                        key={i}
                        className={`roster-spot ${
                            total++ % 2 == 0 ? "light-row" : ""
                        }`}
                    >
                        <button>{key}</button>
                        <div>
                            <img
                                src={logo}
                                style={{ filter: "brightness(0) invert(1)" }}
                            ></img>
                            <div className="bio">
                                <h6>Player Name</h6>
                                <p>irl Team; Pos</p>
                            </div>
                        </div>
                        <h5>69</h5>
                    </div>
                ))
            )}
        </div>
    );
};

export default TeamPane;
