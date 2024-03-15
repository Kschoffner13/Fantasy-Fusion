import { useParams } from "react-router";
import MainHeader from "../Components/MainHeader/MainHeader";
import "../Styles/leaguePage.css";

const LeaguePage = () => {
    //fp leaders
    //standings
    //matchup snapshots
    //transactions

    const { leagueName } = useParams();

    console.log(leagueName);

    return (
        <div className="league-page">
            <MainHeader />
            <h1>{leagueName}</h1>
        </div>
    );
};

export default LeaguePage;
