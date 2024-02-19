import "./style.css";

const DraftPane = () => {
    const players = [
        {
            name: "LeBron James",
            league: "nba",
            P: 25.4,
            A: 7.9,
            R: 7.4,
            BLKs: 0.5,
            STLs: 1.0,
            "3PM": 2.3,
            FPs: 200,
        },
        {
            name: "Stephen Curry",
            league: "nba",
            P: 32.0,
            A: 5.8,
            R: 5.5,
            BLKs: 0.1,
            STLs: 1.2,
            "3PM": 5.3,
            FPs: 250,
        },
        {
            name: "Connor McDavid",
            league: "nhl",
            Pts: 105,
            G: 33,
            A: 72,
            PPP: 37,
            BLKs: 21,
            HTs: 40,
            PIM: 20,
            FPs: 300,
        },
        {
            name: "Auston Matthews",
            league: "nhl",
            Pts: 66,
            G: 41,
            A: 25,
            PPP: 25,
            BLKs: 20,
            HTs: 60,
            PIM: 10,
            FPs: 350,
        },
    ];

    return (
        <div className="draft-pane">
            <div className="draft-options">
                <div>All</div>
                <div>NBA</div>
                <div>NHL</div>
            </div>
            <div className="player-box">
                {players.map((player, index) => (
                    <div key={index} className="player-draft-info">
                        <h2>{player.name}</h2>
                        {Object.entries(player).map(([key, value]) => {
                            if (key !== "name") {
                                return (
                                    <p key={key}>
                                        {key}: {value}
                                    </p>
                                );
                            }
                            return null;
                        })}
                        <button>Draft</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DraftPane;
