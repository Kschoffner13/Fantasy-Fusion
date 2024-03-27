import "./style.css";
import logo from "../../images/logo.png";
import { useState, useEffect } from "react";
import FLAccessor from "../../Accessors/FLAccessor";
import TeamAccessor from "../../Accessors/TeamAccessor";

const MatchupSnapshot = ({ leagueName, userTeamId }) => {
    const [league, setLeague] = useState({});
    const [week, setWeek] = useState("");
    const [userScore, setUserScore] = useState(0);
    const [oppTeam, setOppTeam] = useState({});
    const [lastWeekUserScore, setLastWeekUserScore] = useState(0);
    const [lastWeekOppScore, setLastWeekOppScore] = useState(0);

    const getWeek = () => {
        const currentDate = new Date();
        for (let week in league.Schedule) {
            let startDate = new Date(league.Schedule[week].StartDate);
            let endDate = new Date(league.Schedule[week].EndDate);
            if (currentDate >= startDate && currentDate <= endDate) {
                setWeek(week);
            }
        }
    };

    const getLeague = async () => {
        const leagueAccessor = new FLAccessor("");
        const res = await leagueAccessor.getFantasyLeague(leagueName);
        setLeague(res);
    };

    const parseInfo = async () => {
        const weekMatches = league.Schedule[week];
        // console.log("BEGIN", weekMatches);
        for (let match of weekMatches.Matches) {
            if (match.Team1 === userTeamId || match.Team2 === userTeamId) {
                const teamAccessor = new TeamAccessor();
                let opp = {};
                if (match.Team1 === userTeamId) {
                    setUserScore(match.Score.Team1);
                    const res = await teamAccessor.getTeamById(match.Team2);
                    opp["score"] = match.Score.Team2;
                    opp["name"] = res.Name;
                } else {
                    setUserScore(match.Score.Team2);
                    const res = await teamAccessor.getTeamById(match.Team1);
                    opp["score"] = match.Score.Team1;
                    opp["name"] = res.Name;
                }
                // console.log("MATCH", match, opp);
                setOppTeam(opp);
                break;
            }
        }
    };

    const parseInfoLastWeek = async () => {
        // Get the week number from the week string (assuming it's in the format "WeekN")
        let weekNumber = parseInt(week.slice(4));

        // Check if it's not the first week
        if (weekNumber > 1) {
            // Get the previous week
            let lastWeek = "Week" + (weekNumber - 1);
            const lastWeekMatches = league.Schedule[lastWeek];
            // console.log("LAST WEEK");
            for (let match of lastWeekMatches.Matches) {
                if (match.Team1 === userTeamId || match.Team2 === userTeamId) {
                    // console.log("LAST", match);
                    if (match.Team1 === userTeamId) {
                        setLastWeekUserScore(match.Score.Team1);
                        setLastWeekOppScore(match.Score.Team2);
                    } else {
                        setLastWeekUserScore(match.Score.Team2);
                        setLastWeekOppScore(match.Score.Team1);
                    }
                    break;
                }
            }
        } else {
            console.log("No previous week available");
        }
    };

    useEffect(() => {
        getLeague();
    }, []);

    useEffect(() => {
        // console.log(league.Schedule);
        if (league && Object.keys(league).length !== 0) {
            getWeek();
        }
    }, [league]);

    useEffect(() => {
        // console.log("WEEK", week);
        if (week.length > 0) {
            parseInfo();
            parseInfoLastWeek();
        }
    }, [week]);

    return (
        <div className="matchup-snapshot">
            <h5>Week {week.charAt(week.length - 1)}</h5>
            <div className="snapshot-teams">
                <h4>My Team</h4>
                <h4>{oppTeam.name}</h4>
            </div>
            <div className="snapshot-scoreboard">
                <div className="snapshot-score">
                    <img src={logo}></img>
                    <h3>{userScore}</h3>
                </div>
                <h5>vs</h5>
                <div className="snapshot-score">
                    <h3>{oppTeam.score}</h3>
                    <img src={logo}></img>
                </div>
            </div>
            <h6>
                Last Week:{" "}
                {lastWeekUserScore > lastWeekOppScore
                    ? " (W) "
                    : lastWeekUserScore < lastWeekOppScore
                    ? " (L) "
                    : " (D) "}
                {lastWeekUserScore} - {lastWeekOppScore}
            </h6>
        </div>
    );
};

export default MatchupSnapshot;
