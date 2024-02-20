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
            G: 41,
            A: 25,
            PPP: 25,
            BLKs: 20,
            HTs: 60,
            PIM: 10,
            FPs: 350,
        },
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
            G: 41,
            A: 25,
            PPP: 25,
            BLKs: 20,
            HTs: 60,
            PIM: 10,
            FPs: 350,
        },
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
                        <button>+</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DraftPane;
