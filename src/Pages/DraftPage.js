import "../Styles/draftPage.css";

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

    return (
        <div>
            <div>
                <h1>Header bar</h1>
            </div>
            <div>
                <h1>Draft Board</h1>
            </div>
            <div>
                <div>Draftable players</div>
                <div>My Team</div>
            </div>
        </div>
    );
};

export default DraftPage;
