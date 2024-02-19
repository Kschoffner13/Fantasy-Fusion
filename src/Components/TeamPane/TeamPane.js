import "./style.css";

const TeamPane = ({ format, teams }) => {
    console.log(Object.keys(format).length);

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
                <p>POS</p>
                <p>Player</p>
                <h5>Stat</h5>
            </div>
            {Object.entries(format).map(([key, value]) =>
                Array.from({ length: value }).map((_, i) => (
                    <div key={i} className="roster-spot">
                        <button>{key}</button>
                        <div>
                            <img src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="></img>
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
