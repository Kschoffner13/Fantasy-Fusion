import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import DraftPage from "./Pages/DraftPage";
import TeamPage from "./Pages/TeamPage";
import MatchupPage from "./Pages/MatchupPage";
import FreeAgentsPage from "./Pages/FreeAgentsPage";
import LeaguePage from "./Pages/LeaguePage";
import TeamCreationPage from "./Pages/TeamCreationPage";

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/:leagueName/draft" element={<DraftPage />} />
                    <Route
                        path="/:leagueName/:teamName"
                        element={<TeamPage />}
                    />
                    <Route
                        path="/:leagueName/matchup"
                        element={<MatchupPage />}
                    />
                    <Route
                        path="/:leagueName/players"
                        element={<FreeAgentsPage />}
                    />
                    <Route path="/:leagueName" element={<LeaguePage />} />
                    <Route
                        path="/:leagueName/createteam"
                        element={<TeamCreationPage />}
                    />
                </Routes>
            </HashRouter>
            {/*  */}
        </div>
    );
}

export default withAuthenticator(App);
