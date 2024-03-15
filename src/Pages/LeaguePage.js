import { useParams } from "react-router";
import MainHeader from "../Components/MainHeader/MainHeader";
import "../Styles/leaguePage.css";
import Table from "../Components/Table/Table";
import MatchupSnapshot from "../Components/MatchupSnapshot/MatchupSnapshot";

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
            <div className="matchup-snapshots">
                <MatchupSnapshot />
                <MatchupSnapshot />
                <MatchupSnapshot />
                <MatchupSnapshot />
                <MatchupSnapshot />
                <MatchupSnapshot />
            </div>
            <h1>{leagueName}</h1>
            <div className="league-tables">
                <Table
                    headers={["test"]}
                    roster={["test"]}
                    rosterPlacement={[]}
                    setRosterPlacement={null}
                    filterKeys={null}
                    title={"Fantasy Leaders"}
                />

                <Table
                    headers={["test"]}
                    roster={["test"]}
                    rosterPlacement={[]}
                    setRosterPlacement={null}
                    filterKeys={null}
                    title={"Standings"}
                />
                <Table
                    headers={["test"]}
                    roster={["test"]}
                    rosterPlacement={[]}
                    setRosterPlacement={null}
                    filterKeys={null}
                    title={"Transactions"}
                />
            </div>
        </div>
    );
};

export default LeaguePage;
