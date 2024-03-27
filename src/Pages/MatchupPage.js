import MatchupView from "../Components/MatchupView/MatchupView";
import "../Styles/matchupPage.css";
import MainHeader from "../Components/MainHeader/MainHeader.js";
import Footer from "../Components/Footer/Footer.js";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AccessVerification from "../Helpers/AccessVerification.js";
import { getCurrentUser } from "aws-amplify/auth";
import { useEffect } from "react";
import TeamAccessor from "../Accessors/TeamAccessor.js";
import FLAccessor from "../Accessors/FLAccessor.js";

const MatchupPage = () => {
    const { leagueName } = useParams();
    const nav = useNavigate();
    const [userScore, setUserScore] = useState(0);
    const [oppScore, setOppScore] = useState(0);
    const [oppTeam, setOppTeam] = useState({});
    const [userTeam, setUserTeam] = useState({});

    const verifyAccess = async () => {
        const userId = (await getCurrentUser()).userId;
        const verifier = new AccessVerification(userId, leagueName);
        if (!(await verifier.verifyLeagueAccess())) {
            nav("/");
        }
    };

    const getCurrentWeek = (schedule) => {
        const currentDate = new Date();

        for (const week in schedule) {
            const startDate = new Date(schedule[week].StartDate);
            const endDate = new Date(schedule[week].EndDate);
            if (currentDate >= startDate && currentDate <= endDate) {
                return week;
            }
        }
    };

    const getMatchForUserTeam = (week, userTeamId) => {
        // let userMatch;
        //console.log("HERHEHR", week);
        for (const match of week.Matches) {
            if (match.Team1 === userTeamId || match.Team2 === userTeamId) {
                return match;
            }
        }

        //return userMatch;
    };

    const getInfo = async () => {
        const teamAccessor = new TeamAccessor();
        const leagueAccessor = new FLAccessor("");
        const user = await getCurrentUser();

        const teamsRes = await teamAccessor.getLeaugesTeams(leagueName);
        const leagueRes = await leagueAccessor.getFantasyLeague(leagueName);

        const userTeamRaw = teamsRes.find(
            (team) => team.UserID === user.userId
        );
        setUserTeam(userTeamRaw);

        const schedule = leagueRes.Schedule;

        const week = getCurrentWeek(schedule);

        const match = getMatchForUserTeam(schedule[week], userTeamRaw.id);

        if (match.Team1 === userTeamRaw.id) {
            setUserScore(match.Score.Team1);
            setOppScore(match.Score.Team2);
            const oppTeamRaw = teamsRes.find(
                (team) => team.UserID === match.Team2
            );
            setOppTeam(oppTeamRaw);
        } else {
            setUserScore(match.Score.Team2);
            setOppScore(match.Score.Team1);
            const oppTeamRaw = teamsRes.find(
                (team) => team.UserID === match.Team1
            );
            setOppTeam(oppTeamRaw);
        }

        console.log("HRER", userTeamRaw, schedule, week, match);
    };

    useEffect(() => {
        verifyAccess();
        getInfo();
    }, []);

    const [currentDate, setCurrentDate] = useState(
        new Date(Date.now() - 86400000)
    );
    const goBackOneDay = () => {
        setCurrentDate((prevDate) => {
            let newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() - 1);
            return newDate;
        });
    };

    const goForwardOneDay = () => {
        setCurrentDate((prevDate) => {
            let newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + 1);
            return newDate;
        });
    };

    return (
        <div className="matchup-page">
            <MainHeader />
            {/* <div className="date-selector">
                <button onClick={goBackOneDay}>&#9667;</button>
                <p>{currentDate.toLocaleDateString()}</p>
                <button onClick={goForwardOneDay}>&#9657;</button>
            </div> */}
            <div className="matchup-overview">
                <div className="user-team-section">
                    <MatchupView team={userTeam} score={userScore} />
                </div>
                <div className="opponent-team-section">
                    <MatchupView team={userTeam} reversed={true} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MatchupPage;
