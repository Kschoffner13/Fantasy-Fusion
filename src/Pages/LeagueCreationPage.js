import "../Styles/leagueCreationPage.css";
import FLAccessor from "../Accessors/FLAccessor";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@aws-amplify/auth";
import inviteClass from "../Accessors/InviteClass";
import { useNavigate } from "react-router-dom";

const LeagueCreationPage = () => {
    const nav = useNavigate();

    const [leagueName, setLeagueName] = useState("");
    const [draftDate, setDraftDate] = useState("");
    const [tradeDeadlineDate, setTradeDeadlineDate] = useState("");
    const [playoffStartDate, setPlayoffStartDate] = useState("");
    const [weeklyPickups, setWeeklyPickups] = useState(4);
    const [vetoEnabled, setVetoEnabled] = useState(false);
    const [rosterSize, setRosterSize] = useState("");
    const [includedLeagues, setIncludedLeagues] = useState("");

    const [leagueAccessor, setLeagueAccessor] = useState(null);

    const [teamCount, setTeamCount] = useState(1);
    const [emails, setEmails] = useState([]);

    const handleEmailChange = (index, event) => {
        const newEmails = [...emails];
        newEmails[index] = event.target.value;
        setEmails(newEmails);
    };

    const handleTeamCountChange = (event) => {
        setTeamCount(event.target.value);
        setEmails(new Array(event.target.value - 1).fill(""));
    };

    const sendInvites = (leagueId) => {
        //Koen will work his magic here
        const emailer = new inviteClass();
        try {
            emails.forEach((email) => {
                emailer.sendInvite(email, leagueId);
            });
        } catch {
            console.log("failed to send email");
        }
    };

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
        try {
            const status = await leagueAccessor.saveFantasyLeague(
                leagueName,
                null,
                draftDate,
                tradeDeadlineDate,
                playoffStartDate,
                4,
                1,
                4,
                vetoEnabled,
                null
            );
            console.log("USEME", status.id);
            sendInvites(status.id);
            nav(`/${status.id}/createteam`);
        } catch (error) {
            console.log("FAILED", error);
        }
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
                <label>
                    Number of Teams:
                    <input
                        type="number"
                        value={teamCount}
                        onChange={handleTeamCountChange}
                    />
                </label>
                {emails.map((email, index) => (
                    <label key={index}>
                        Team {index + 2} Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                handleEmailChange(index, event)
                            }
                        />
                    </label>
                ))}
            </form>
            <button onClick={create}>Create</button>
        </div>
    );
};

export default LeagueCreationPage;
