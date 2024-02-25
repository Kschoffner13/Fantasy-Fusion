import "./style.css";

const RosterPopup = ({
    roster,
    rosterPlacement,
    setRosterPlacement,
    isOpen,
    setIsOpen,
    toSwap,
}) => {
    if (!isOpen) {
        return null;
    }

    console.log(toSwap);
    const outPlayer = roster.find((player) => player.id === toSwap.id);

    //get players on bench filter by pos
    // Get the IDs of the BCH items
    const bchIds = Object.entries(rosterPlacement)
        .filter(([key]) => key.startsWith("BCH"))
        .map(([, id]) => id);

    let matchingPlayers = [];

    const bchPlayers = roster.filter((player) => bchIds.includes(player.id));

    if (toSwap.slot == "SM") {
        matchingPlayers = bchPlayers.filter(
            (player) => player.league === "NBA"
        );
    } else if (toSwap.slot == "UTL") {
        matchingPlayers = bchPlayers;
    } else {
        matchingPlayers = bchPlayers.filter(
            (player) => player.position === toSwap.slot
        );
    }

    console.log("OPEN", matchingPlayers, outPlayer);

    const swapPlayers = (inPlayerId) => {
        const inSlot = Object.keys(rosterPlacement).find(
            (key) => rosterPlacement[key] === outPlayer.id
        );

        const outSlot = Object.keys(rosterPlacement).find(
            (key) => rosterPlacement[key] === inPlayerId
        );

        setRosterPlacement((prevState) => ({
            ...prevState,
            [inSlot]: inPlayerId,
            [outSlot]: outPlayer.id,
        }));
        setIsOpen(false);
    };
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="swap-section">
                    <div className="player-listing out-player">
                        <h5>{outPlayer.name}</h5>
                        <p>Team: {outPlayer.team}</p>
                        <p>Position: {outPlayer.position}</p>
                        <p>PPG: {outPlayer.PPG}</p>
                        <p>RPG: {outPlayer.RPG}</p>
                        <p>APG: {outPlayer.APG}</p>
                        <p>GP: {outPlayer.GP}</p>
                        <button className="out-btn">&#8595;</button>
                    </div>
                    <div>
                        {matchingPlayers.map((player, index) => (
                            <div key={index} className="player-listing">
                                <h5>{player.name}</h5>
                                <p>Team: {player.team}</p>
                                <p>Position: {player.position}</p>
                                <p>PPG: {player.PPG}</p>
                                <p>RPG: {player.RPG}</p>
                                <p>APG: {player.APG}</p>
                                <p>GP: {player.GP}</p>
                                <button
                                    className="in-btn"
                                    onClick={() => swapPlayers(player.id)}
                                >
                                    &#8593;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="cancel-swap-btn"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default RosterPopup;
