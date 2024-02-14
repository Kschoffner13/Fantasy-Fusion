import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                </Routes>
            </HashRouter>
            {/*  */}
        </div>
    );
}

export default withAuthenticator(App);
