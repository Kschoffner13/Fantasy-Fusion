import "../Styles/teamCreationPage.css";
import TeamAccessor from "../Accessors/TeamAccessor";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

const TeamCreationPage = () => {
    const { leagueName } = useParams();
    const nav = useNavigate();
    const teamAccessor = new TeamAccessor();

    console.log(leagueName);

    const verifyLeagueCode = async () => {
        try {
            const x = await teamAccessor.getLeaugesTeams(leagueName);
            if (x.length <= 0) {
                nav("/");
            }
        } catch {
            console("INVALID LEAGUE");
        }
    };

    useEffect(() => {
        verifyLeagueCode();
    }, []);

    return <h1>Create Team</h1>;
};

export default TeamCreationPage;
