import "./style.css";

const DraftBoard = ({ teams, rounds }) => {
    const picksPerRound = teams.length;
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
                        <div className="pick">
                            <p key={`${i}-${pick}`}>
                                {i + 1} - {pick}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default DraftBoard;
