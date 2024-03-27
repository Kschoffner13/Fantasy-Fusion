import { useParams } from "react-router";
import MainHeader from "../Components/MainHeader/MainHeader";
import "../Styles/leaguePage.css";
import Table from "../Components/Table/Table";
import MatchupSnapshot from "../Components/MatchupSnapshot/MatchupSnapshot";
import { useNavigate } from "react-router-dom";
import AccessVerification from "../Helpers/AccessVerification.js";
import { getCurrentUser } from "aws-amplify/auth";
import { useEffect } from "react";
import Footer from "../Components/Footer/Footer.js";

const LeaguePage = () => {
    const { leagueName } = useParams();
    const nav = useNavigate();

    const verifyAccess = async () => {
        const userId = (await getCurrentUser()).userId;
        const verifier = new AccessVerification(userId, leagueName);
        if (!(await verifier.verifyLeagueAccess())) {
            nav("/");
        }
    };

    const getAllLeagueInfo = async () => {};

    useEffect(() => {
        verifyAccess();
    }, []);

    return (
        <div className="league-page">
            <MainHeader />
            {/* <div className="matchup-snapshots">
                <MatchupSnapshot />
                <MatchupSnapshot />
                <MatchupSnapshot />
                <MatchupSnapshot />
                <MatchupSnapshot />
                <MatchupSnapshot />
            </div> */}
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
            <Footer />
        </div>
    );
};

export default LeaguePage;
