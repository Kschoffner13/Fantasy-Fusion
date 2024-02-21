import ProfileHeaderSection from "../Components/ProfileHeaderSection/ProfileHeaderSection";
import "../Styles/leaguePage.css";
import logo from "../images/logo.png";

const LeaguePage = () => {
    return (
        <div className="league-page">
            <header>
                <div className="header-top">
                    <img src={logo}></img>
                    <h6>Home</h6>
                    <h6>My Teams</h6>
                    <h6>How to Play</h6>
                    <ProfileHeaderSection />
                </div>
                <div className="header-bot"></div>
            </header>
        </div>
    );
};

export default LeaguePage;
