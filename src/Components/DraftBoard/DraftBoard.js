import { useState } from "react";
import "./style.css";

const DraftBoard = ({ teams, rounds }) => {
    const picksPerRound = teams.length;

    const [cur, setCur] = useState([1, 2]);
    const myPickNum = 6;

    return (
        <div className="pick-board">
            {Array.from({ length: rounds }, (_, i) => (
                <div key={i} className="round-picks">
                    {(i % 2 === 0
                        ? Array.from({ length: picksPerRound }, (_, j) => j + 1)
                        : Array.from(
                              { length: picksPerRound },
                              (_, j) => picksPerRound - j
                          )
                    ).map((pick) => (
                        <div
                            className={`pick ${
                                i == cur[0] - 1 && pick == cur[1] ? "cur" : ""
                            } ${
                                ((i + 1) % 2 == 1 && pick == myPickNum) ||
                                ((i + 1) % 2 == 0 && 12 - myPickNum + 1 == pick)
                                    ? "my-pick"
                                    : ""
                            }`}
                        >
                            {i * 12 + pick >= (cur[0] - 1) * 12 + cur[1] ? (
                                <div className="not-picked">
                                    <p key={`${i}-${pick}`}>
                                        {i + 1} - {pick}
                                    </p>
                                </div>
                            ) : (
                                <div className="picked">
                                    <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/1628995.png"></img>
                                    <div className="pick-info">
                                        <p>1-1</p>
                                        <h5>Kevin Knox II, F</h5>
                                        <p>UFA</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default DraftBoard;
