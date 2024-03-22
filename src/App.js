import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import DraftPage from "./Pages/DraftPage";
import TeamPage from "./Pages/TeamPage";
import MatchupPage from "./Pages/MatchupPage";
import FreeAgentsPage from "./Pages/FreeAgentsPage";
import LeaguePage from "./Pages/LeaguePage";
import HowToPlayPage from './Pages/HowToPlayPage';
import NBAStatsPage from './Pages/NBAStatsPage';
import LandingHomePage from './Pages/LandingHomePage';
import NHLStatsPage from './Pages/NHLStatsPage';
import AccountPage from "./Pages/AccountPage";


function App() {
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route exact path="/" element={<LandingHomePage />} />
                    <Route path='/nbastats' element={<NBAStatsPage />} />
                    <Route path='/howtoplay' element={<HowToPlayPage />} />
                    <Route path='/nhlstats' element={<NHLStatsPage />} />
                    <Route path='/home' element={<Home />} />
                    <Route path="/:leagueName/draft" element={<DraftPage />} />
                    <Route path="/:leagueName/:teamName" element={<TeamPage />} />
                    <Route path="/:leagueName/matchup" element={<MatchupPage />} />
                    <Route path="/:leagueName/players" element={<FreeAgentsPage />} />
                    <Route path="/:leagueName" element={<LeaguePage />} />
                    <Route path="/account" element={<AccountPage />} />
                </Routes>
            </HashRouter>
            {/*  */}
        </div>
    );
}

export default App;
