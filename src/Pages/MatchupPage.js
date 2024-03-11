import MatchupView from "../Components/MatchupView/MatchupView";

const MatchupPage = () => {
    return (
        <div>
            <div className="user-team-section">
                <MatchupView team={{ name: "test" }} />
            </div>
            <div className="opponent-team-section"></div>
        </div>
    );
};

export default MatchupPage;
