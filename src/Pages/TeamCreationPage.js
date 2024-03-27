import "../Styles/teamCreationPage.css";
import TeamAccessor from "../Accessors/TeamAccessor";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import { getCurrentUser } from "@aws-amplify/auth";
import FLAccessor from "../Accessors/FLAccessor";

const TeamCreationPage = () => {
    const { leagueName } = useParams();
    const nav = useNavigate();
    const [teamAccessor, setTeamAccessor] = useState(null);
    const [league, setLeague] = useState(null);
    const [teamName, setTeamName] = useState("");

    console.log(leagueName);

    const verifyLeagueCode = async () => {
        try {
            const x = await teamAccessor.getLeaugesTeams(leagueName);
            const leagueAccessor = new FLAccessor("");

            const l = await leagueAccessor.getFantasyLeague(leagueName);
            console.log("HERE", l);
            setLeague(l);
            if (l === undefined) {
                nav("/");
            }
        } catch (e) {
            console.log("INVALID LEAGUE", e);
        }
    };

    const initAccessor = async () => {
        try {
            const user = await getCurrentUser();
            console.log(user, leagueName);
            setTeamAccessor(new TeamAccessor(leagueName, user.userId));
        } catch {
            console.log("FAILED TO GET USER");
        }
    };

    useEffect(() => {
        initAccessor();
    }, []);

    useEffect(() => {
        if (teamAccessor) {
            verifyLeagueCode();
        }
    }, [teamAccessor]);

    const handleButtonClick = async () => {
        console.log(
            `Button clicked with team name: ${teamName} - ${leagueName}`
        );
        const rosterPlacement = {
            //Change this to grab from league settings in the future
            GRD1: null,
            GRD2: null,
            FWD1: null,
            FWD2: null,
            CB: null,
            SM: null,
            CH: null,
            WNG1: null,
            WNG2: null,
            DEF1: null,
            DEF2: null,
            GL: null,
            UTL1: null,
            UTL2: null,
            UTL3: null,
            BCH1: null,
            BCH2: null,
            BCH3: null,
            BCH4: null,
            BCH5: null,
            BCH6: null,
            BCH7: null,
            BCH8: null,
        };
        try {
            await teamAccessor.saveTeam(
                teamName,
                0,
                0,
                0,
                0,
                0,
                0,
                null,
                rosterPlacement
            );

            const FLA = new FLAccessor("");
            // get the dates
            const id = teamAccessor.getFantasyLeagueID();
            console.log("ID", id);  
            const sched = await FLA.makeSchedule(id, new Date(2024, 4, 1), new Date(2024, 5, 1));
            await FLA.updateFantasyLeague(id, { Schedule: sched });
            // use the dates to make the schedule and add it to the league

            nav(`/${leagueName}/${teamName}`);
        } catch {
            console.log("CREATION FAILED");
        }
    };

    return (
        <div className="container">
            <h1 className="title">{league?.Name}</h1>
            <h3 className="subtitle">Create Team</h3>
            <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name"
                className="input-field"
            />
            <button onClick={handleButtonClick} className="submit-button">
                Submit
            </button>
        </div>
    );
};

export default TeamCreationPage;
