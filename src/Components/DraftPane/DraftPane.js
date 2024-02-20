import "./style.css";

const DraftPane = ({ players }) => {
    return (
        <div className="draft-pane">
            <div className="draft-options">
                <div className="active">All</div>
                <div>NBA</div>
                <div>NHL</div>
                <div></div>
            </div>
            <div className="player-box">
                <div className="player-draft-info draft-info-head">
                    <h2>Name</h2>
                    <p>League</p>
                    <p>Stats</p>
                    <p>FP&#9660;</p>
                </div>
                {players.map((player, index) => (
                    <div
                        key={index}
                        className={`player-draft-info ${
                            index % 2 ? "" : "dark-row"
                        }`}
                    >
                        <h2>{player.name}</h2>
                        <p>{player.league}</p>
                        {Object.entries(player).map(([key, value]) => {
                            if (
                                key !== "name" &&
                                key !== "team" &&
                                key != "league"
                            ) {
                                return (
                                    <p key={key}>
                                        {key}: {value}
                                    </p>
                                );
                            }
                            return null;
                        })}
                        <p>200</p>
                        <button>+</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DraftPane;
