import "../Styles/leagueCreationPage.css";
import FLAccessor from "../Accessors/FLAccessor";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@aws-amplify/auth";

const LeagueCreationPage = () => {
    const [leagueName, setLeagueName] = useState("");
    const [draftDate, setDraftDate] = useState("");
    const [tradeDeadlineDate, setTradeDeadlineDate] = useState("");
    const [playoffStartDate, setPlayoffStartDate] = useState("");
    const [weeklyPickups, setWeeklyPickups] = useState(4);
    const [vetoEnabled, setVetoEnabled] = useState(false);
    const [rosterSize, setRosterSize] = useState("");
    const [includedLeagues, setIncludedLeagues] = useState("");

    const [leagueAccessor, setLeagueAccessor] = useState(null);

    const initPage = async () => {
        try {
            const user = await getCurrentUser();
            setLeagueAccessor(new FLAccessor(user.userId));
        } catch {
            console.log("FAILED TO GRAB USER");
        }
    };

    useEffect(() => {
        initPage();
    }, []);

    const create = async () => {
        const toUpload = {
            Name: leagueName,
            Properties: null,
            DraftDate: new Date(draftDate).toISOString(),
            TradeDeadline: new Date(tradeDeadlineDate).toISOString(),
            PlayoffStartDate: new Date(playoffStartDate).toISOString(),
            PlayoffTeams: 4,
            PlayoffMatchupLength: 1,
            VetoVoteEnabled: false,
            Schedule: null,
        };

        await leagueAccessor.saveFantasyLeague(toUpload);
    };

    return (
        <div className="league-creation-page">
            <h1>Create a League</h1>
            <form>
                <label>
                    League Name:
                    <input
                        type="text"
                        value={leagueName}
                        onChange={(e) => setLeagueName(e.target.value)}
                    />
                </label>
                <label>
                    Draft Date:
                    <input
                        type="datetime-local"
                        value={draftDate}
                        onChange={(e) => setDraftDate(e.target.value)}
                    />
                </label>
                <label>
                    Trade Deadline Date:
                    <input
                        type="datetime-local"
                        value={tradeDeadlineDate}
                        onChange={(e) => setTradeDeadlineDate(e.target.value)}
                    />
                </label>
                <label>
                    Playoff Start Date:
                    <input
                        type="datetime-local"
                        value={playoffStartDate}
                        onChange={(e) => setPlayoffStartDate(e.target.value)}
                    />
                </label>
                <label>
                    Weekly Pickups:
                    <input
                        type="number"
                        value={weeklyPickups}
                        onChange={(e) => setWeeklyPickups(e.target.value)}
                    />
                </label>
                <label>
                    Veto Enabled:
                    <input
                        type="checkbox"
                        checked={vetoEnabled}
                        onChange={(e) => setVetoEnabled(e.target.checked)}
                    />
                </label>
                <label>
                    Roster Size:
                    <input
                        type="number"
                        value={rosterSize}
                        onChange={(e) => setRosterSize(e.target.value)}
                    />
                </label>
                <label>
                    Included Leagues:
                    <select
                        value={includedLeagues}
                        onChange={(e) => setIncludedLeagues(e.target.value)}
                    >
                        <option value="nba">NBA</option>
                        <option value="nhl">NHL</option>
                        <option value="both">NBA + NHL</option>
                    </select>
                </label>
            </form>
            <button onClick={create}>Create</button>
        </div>
    );
};

export default LeagueCreationPage;
