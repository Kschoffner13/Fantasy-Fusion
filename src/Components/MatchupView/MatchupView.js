import "./style.css";
import logo from "../../images/logo.png";
import Table from "../Table/Table.js";
import { useState } from "react";

const MatchupView = ({ team }) => {
    /*
        Team name/logo - points
        starters w/ games table
    */

    const [format, setFormat] = useState(team.format);

    return (
        <div>
            <div>
                <div>
                    <img src={logo}></img>
                    <h3>{team.name}</h3>
                </div>
                <h1>123.45</h1>
            </div>
            <Table
                headers={["name", "FP"]}
                roster={team.roster}
                rosterPlacement={team.format}
                setRosterPlacement={setFormat}
                filterKeys={["GRD", "FWD", "CB", "SM"]}
                glStats={null}
                hasButton={false}
            />
            <Table
                headers={["name", "FP"]}
                roster={team.roster}
                rosterPlacement={team.format}
                setRosterPlacement={setFormat}
                filterKeys={["CH", "WNG", "DEF", "GL"]}
                glStats={["name", "FP"]}
                hasButton={false}
            />
            <Table
                headers={["name", "FP"]}
                roster={team.roster}
                rosterPlacement={team.format}
                filterKeys={["UTL"]}
                setRosterPlacement={setFormat}
                glStats={null}
                hasButton={false}
            />
        </div>
    );
};

export default MatchupView;
