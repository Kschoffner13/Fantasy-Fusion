import "./style.css";
import { useState } from "react";

const RosterSection = () => {
    const roster = [
        {
            id: 0,
            name: "Player 1",
            team: "Team A",
            league: "NHL",
            position: "CH",
            G: 20,
            A: 30,
            P: 50,
            GP: 60,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team B" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team C" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team D" },
            ],
        },
        {
            id: 1,
            name: "Player 2",
            team: "Team E",
            league: "NHL",
            position: "WNG",
            G: 22,
            A: 28,
            P: 50,
            GP: 62,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team F" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team G" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team H" },
            ],
        },
        {
            id: 2,
            name: "Player 3",
            team: "Team I",
            league: "NHL",
            position: "WNG",
            G: 24,
            A: 26,
            P: 50,
            GP: 64,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team J" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team K" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team L" },
            ],
        },
        {
            id: 3,
            name: "Player 4",
            team: "Team M",
            league: "NHL",
            position: "DEF",
            G: 26,
            A: 24,
            P: 50,
            GP: 66,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team N" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team O" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team P" },
            ],
        },
        {
            id: 4,
            name: "Player 5",
            team: "Team Q",
            league: "NHL",
            position: "GL",
            W: 28,
            L: 22,
            SV: 0.912,
            GP: 58,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team R" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team S" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team T" },
            ],
        },
        {
            id: 5,
            name: "Player 6",
            team: "Team R",
            league: "NHL",
            position: "CH",
            G: 30,
            A: 20,
            P: 50,
            GP: 70,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team S" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team T" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team U" },
            ],
        },
        {
            id: 6,
            name: "Player 7",
            team: "Team S",
            league: "NHL",
            position: "WNG",
            G: 28,
            A: 22,
            P: 50,
            GP: 72,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team V" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team W" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team X" },
            ],
        },
        {
            id: 7,
            name: "Player 8",
            team: "Team T",
            league: "NHL",
            position: "WNG",
            G: 26,
            A: 24,
            P: 50,
            GP: 74,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team Y" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team Z" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team A" },
            ],
        },
        {
            id: 8,
            name: "Player 9",
            team: "Team U",
            league: "NHL",
            position: "DEF",
            G: 24,
            A: 26,
            P: 50,
            GP: 76,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team B" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team C" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team D" },
            ],
        },
        {
            id: 9,
            name: "Player 10",
            team: "Team V",
            league: "NHL",
            position: "GL",
            W: 22,
            L: 28,
            SV: 0.912,
            GP: 68,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team E" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team F" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team G" },
            ],
        },
        {
            id: 10,
            name: "Player 1",
            team: "Team A",
            league: "NBA",
            position: "GRD",
            PPG: 20,
            APG: 5,
            RPG: 4,
            GP: 50,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team B" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team C" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team D" },
            ],
        },
        {
            id: 11,
            name: "Player 2",
            team: "Team E",
            league: "NBA",
            position: "GRD",
            PPG: 22,
            APG: 6,
            RPG: 4,
            GP: 52,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team F" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team G" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team H" },
            ],
        },
        {
            id: 12,
            name: "Player 3",
            team: "Team I",
            league: "NBA",
            position: "FWD",
            PPG: 24,
            APG: 5,
            RPG: 6,
            GP: 54,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team J" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team K" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team L" },
            ],
        },
        {
            id: 13,
            name: "Player 4",
            team: "Team M",
            league: "NBA",
            position: "FWD",
            PPG: 26,
            APG: 4,
            RPG: 7,
            GP: 56,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team N" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team O" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team P" },
            ],
        },
        {
            id: 14,
            name: "Player 5",
            team: "Team Q",
            league: "NBA",
            position: "CB",
            PPG: 28,
            APG: 3,
            RPG: 8,
            GP: 58,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team R" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team S" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team T" },
            ],
        },
        {
            id: 15,
            name: "Player 6",
            team: "Team R",
            league: "NBA",
            position: "GRD",
            PPG: 30,
            APG: 2,
            RPG: 9,
            GP: 60,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team S" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team T" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team U" },
            ],
        },
        {
            id: 16,
            name: "Player 7",
            team: "Team S",
            league: "NBA",
            position: "FWD",
            PPG: 18,
            APG: 7,
            RPG: 5,
            GP: 62,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team V" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team W" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team X" },
            ],
        },
        {
            id: 17,
            name: "Player 8",
            team: "Team T",
            league: "NBA",
            position: "CB",
            PPG: 16,
            APG: 8,
            RPG: 6,
            GP: 64,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team Y" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team Z" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team A" },
            ],
        },
        {
            id: 18,
            name: "Player 9",
            team: "Team U",
            league: "NBA",
            position: "GRD",
            PPG: 14,
            APG: 9,
            RPG: 7,
            GP: 66,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team B" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team C" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team D" },
            ],
        },
        {
            id: 19,
            name: "Player 10",
            team: "Team V",
            league: "NBA",
            position: "FWD",
            PPG: 12,
            APG: 10,
            RPG: 8,
            GP: 68,
            games: [
                { dayTime: "2022-10-01T20:00:00", opp: "Team E" },
                { dayTime: "2022-10-02T20:00:00", opp: "Team F" },
                { dayTime: "2022-10-03T20:00:00", opp: "Team G" },
            ],
        },
    ];

    const rosterFormat = {
        GRD: 2,
        FWD: 2,
        CB: 1,
        SM: 1,
        CH: 1,
        WNG: 2,
        DEF: 2,
        GL: 1,
        UTL: 3,
        BCH: 8,
    };

    const [rosterPlacement, setRosterPlacement] = useState({
        GRD1: null,
        GRD2: null,
        FWD1: null,
        FWD2: null,
        CB: null,
        SM: null,
        CH: null,
        WNG1: null,
        WNG2: null,
        DEF1: null,
        DEF2: null,
        GL: null,
        UTL1: null,
        UTL2: null,
        UTL3: null,
    });

    const colsB = ["Player", "GP", "PPG", "APG", "RPG", "FPPG"];
    const colsH = ["Player", "GP", "P", "G", "A", "FPPG"];
    const colsU = ["Player", "GP", "FPPG"];

    const spotsB = 5;
    const spotsH = 6;
    const spotsU = 3;

    return (
        <div className="active-section">
            <div className="table1">
                <div className="header">
                    {colsB.map((col, index) => (
                        <div key={index}>{col}</div>
                    ))}
                </div>
                {Object.keys(rosterPlacement)
                    .filter(
                        (key) =>
                            key.includes("CB") ||
                            key.includes("FWD") ||
                            key.includes("GRD") ||
                            key.includes("SM")
                    )
                    .map((key, index) => (
                        <div key={index} className="row">
                            {rosterPlacement[key] ? null : <p>-</p>}
                            <button className="roster-btn">
                                {key.replace(/\d+/g, "")}
                            </button>
                        </div>
                    ))}
            </div>
            <div className="util-table">
                <div className="header-util">
                    {colsU.map((col, index) => (
                        <div key={index}>{col}</div>
                    ))}
                </div>
                {Object.keys(rosterPlacement)
                    .filter((key) => key.includes("UTL"))
                    .map((key, index) => (
                        <div key={index} className="row-util">
                            {rosterPlacement[key] ? null : <p>-</p>}
                            <button className="roster-btn">
                                {key.replace(/\d+/g, "")}
                            </button>
                        </div>
                    ))}
            </div>
            <div className="table2">
                <div className="header">
                    {colsH.map((col, index) => (
                        <div key={index}>{col}</div>
                    ))}
                </div>
                {Object.keys(rosterPlacement)
                    .filter(
                        (key) =>
                            key.includes("CH") ||
                            key.includes("WNG") ||
                            key.includes("DEF") ||
                            key.includes("GL")
                    )
                    .map((key, index) => (
                        <div key={index} className="row">
                            {rosterPlacement[key] ? null : <p>-</p>}
                            <button className="roster-btn">
                                {key.replace(/\d+/g, "")}
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default RosterSection;
