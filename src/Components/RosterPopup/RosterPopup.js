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

    // console.log(toSwap);
    const outPlayer = roster.find((player) => player.player_id === toSwap.id);

    //get players on bench filter by pos
    // Get the IDs of the BCH items
    const bchIds = Object.entries(rosterPlacement)
        .filter(([key]) => key.startsWith("BCH"))
        .map(([, id]) => id);

    let matchingPlayers = [];

    // console.log("BCHIDS", bchIds);

    const bchPlayers = roster.filter((player) =>
        bchIds.includes(player.player_id)
    );

    // console.log("BCHplayers", bchPlayers);

    if (toSwap.slot == "SM") {
        matchingPlayers = bchPlayers.filter(
            (player) => player.player_id.substring(0, 3) === "NBA"
        );
    } else if (toSwap.slot == "UTL") {
        matchingPlayers = bchPlayers;
    } else {
        matchingPlayers = bchPlayers.filter(
            (player) => player.stats.position === toSwap.slot
        );
    }

    // console.log("OPEN", matchingPlayers, outPlayer);

    const swapPlayers = (inPlayerId) => {
        const inSlot = Object.keys(rosterPlacement).find(
            (key) => rosterPlacement[key] === outPlayer?.player_id
        );

        const outSlot = Object.keys(rosterPlacement).find(
            (key) => rosterPlacement[key] === inPlayerId
        );

        setRosterPlacement((prevState) => ({
            ...prevState,
            [toSwap.posSlot]: inPlayerId,
            [outSlot]: outPlayer?.player_id ? outPlayer.player_id : null,
        }));
        setIsOpen(false);
    };
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="swap-section">
                    <div className="player-listing out-player">
                        <h5>{outPlayer?.stats.name}</h5>
                        <p>Team: </p>
                        <p>Position: {outPlayer?.stats.position}</p>
                        <p>PPG: </p>
                        <p>RPG: </p>
                        <p>APG: </p>
                        <p>GP: </p>
                        <button className="out-btn">&#8595;</button>
                    </div>
                    <div>
                        {matchingPlayers.map((player, index) => (
                            <div key={index} className="player-listing">
                                <h5>{player.stats.name}</h5>
                                <p>Team: </p>
                                <p>Position: {player.stats.position}</p>
                                <p>PPG:</p>
                                <p>RPG: </p>
                                <p>APG: </p>
                                <p>GP: </p>
                                <button
                                    className="in-btn"
                                    onClick={() =>
                                        swapPlayers(player.player_id)
                                    }
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
