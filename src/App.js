import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import DraftPage from "./Pages/DraftPage";

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/:leagueName/draft" element={<DraftPage />} />
                </Routes>
            </HashRouter>
            {/*  */}
        </div>
    );
}

export default withAuthenticator(App);
