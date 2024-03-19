import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import DraftPage from "./Pages/DraftPage";
import TeamPage from "./Pages/TeamPage";
import MatchupPage from "./Pages/MatchupPage";
import FreeAgentsPage from "./Pages/FreeAgentsPage";
import LeaguePage from "./Pages/LeaguePage";
import H2P from './Pages/H2P';
import NBALiveStats from './Pages/NBALiveStats';
import LandingPage from './Pages/LandingPage';
import NHLLiveStats from './Pages/NHLLiveStats';


function App() {
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route exact path="/" element={<LandingPage />} />
                    <Route path='/nba' element={<NBALiveStats />} />
                    <Route path='/howtoplay' element={<H2P />} />
                    <Route path='/nhl' element={<NHLLiveStats />} />
                    <Route path='/home' element={<Home />} />
                    <Route path="/:leagueName/draft" element={<DraftPage />} />
                    <Route path="/:leagueName/:teamName" element={<TeamPage />} />
                    <Route path="/:leagueName/matchup" element={<MatchupPage />} />
                    <Route path="/:leagueName/players" element={<FreeAgentsPage />} />
                    <Route path="/:leagueName" element={<LeaguePage />} />
                </Routes>
            </HashRouter>
            {/*  */}
        </div>
    );
}

export default App;
