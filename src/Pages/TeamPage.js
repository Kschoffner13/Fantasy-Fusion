import "../Styles/teamPage.css";
import logo from "../images/logo.png";
import MainHeader from "../Components/MainHeader/MainHeader.js";
import RosterSection from "../Components/RosterSection/RosterSection.js";
import Footer from "../Components/Footer/Footer.js";
import MatchupSnapshot from "../Components/MatchupSnapshot/MatchupSnapshot.js";

const TeamPage = () => {
    return (
        <div className="league-page">
            <MainHeader />
            <div className="team-info-section">
                <div className="team-info-block">
                    <img src={logo}></img>
                    <div className="team-info-text">
                        <h1>Team</h1>
                        <div className="team-record-info">
                            <h2>2nd Place</h2>
                            <h3>
                                Record: <span>12</span> - <span>3</span> -
                                <span> 1</span>
                            </h3>
                        </div>
                        <p>Owner: Username</p>
                    </div>
                </div>
                <MatchupSnapshot />
            </div>
            <RosterSection />
            <Footer />
        </div>
    );
};

export default TeamPage;
