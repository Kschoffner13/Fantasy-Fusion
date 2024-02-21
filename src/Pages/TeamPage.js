import "../Styles/teamPage.css";

import MainHeader from "../Components/MainHeader/MainHeader.js";
import RosterSection from "../Components/RosterSection/RosterSection.js";
import Footer from "../Components/Footer/Footer.js";

const TeamPage = () => {
    return (
        <div className="league-page">
            <MainHeader />
            <div className="team-info-section">
                <p>team</p>
            </div>
            <RosterSection />
            <Footer />
        </div>
    );
};

export default TeamPage;
