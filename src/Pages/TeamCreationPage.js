import "../Styles/teamCreationPage.css";
import TeamAccessor from "../Accessors/TeamAccessor";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import { getCurrentUser } from "@aws-amplify/auth";

const TeamCreationPage = () => {
    const { leagueName } = useParams();
    const nav = useNavigate();
    const [teamAccessor, setTeamAccessor] = useState(null);

    const [teamName, setTeamName] = useState("");

    console.log(leagueName);

    const verifyLeagueCode = async () => {
        try {
            const x = await teamAccessor.getLeaugesTeams(leagueName);
            if (x.length <= 0) {
                nav("/");
            }
        } catch {
            console.log("INVALID LEAGUE");
        }
    };

    const initAccessor = async () => {
        try {
            const user = await getCurrentUser();
            console.log(user);
            setTeamAccessor(new TeamAccessor(leagueName, user.userId));
        } catch {
            console.log("FAILED TO GET USER");
        }
    };

    useEffect(() => {
        initAccessor();
        verifyLeagueCode();
    }, []);

    const handleButtonClick = async () => {
        console.log(`Button clicked with team name: ${teamName}`);
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
        await teamAccessor.saveTeam(
            teamName,
            0,
            0,
            0,
            0,
            0,
            0,
            null,
            null,
            rosterPlacement
        );
    };

    return (
        <div>
            <h1>Create Team</h1>
            <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name"
            />
            <button onClick={handleButtonClick}>Submit</button>
        </div>
    );
};

export default TeamCreationPage;
