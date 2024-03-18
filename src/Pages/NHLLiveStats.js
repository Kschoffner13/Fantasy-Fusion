import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../Styles/NHLLiveStats.css';

function NHLLiveStats() {
  const [playerStats, setPlayerStats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlayerStats, setFilteredPlayerStats] = useState([]);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const mockPlayerStats = [
        { playerName: 'Player 1', stats: [
          { name: 'Goals', value: 10 },
          { name: 'Assists', value: 20 },
          { name: 'Points', value: 30 }
        ] },
        { playerName: 'Player 2', stats: [
          { name: 'Goals', value: 5 },
          { name: 'Assists', value: 15 },
          { name: 'Points', value: 20 }
        ] },
        { playerName: 'Player 3', stats: [
          { name: 'Goals', value: 8 },
          { name: 'Assists', value: 12 },
          { name: 'Points', value: 20 }
        ] }
      ];
      setPlayerStats(mockPlayerStats);
      setFilteredPlayerStats(mockPlayerStats);
    }, 2000); // Simulating delay for API call
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredPlayerStats(playerStats);
    } else {
      const filteredPlayers = playerStats.filter(player =>
        player.playerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlayerStats(filteredPlayers);
    }
  }, [searchQuery, playerStats]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <h1>NHL Stats</h1>
      <input
        type="text"
        placeholder="Search player..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="player-stats-container">
        {filteredPlayerStats.map((player, index) => (
          <div className="player-stats" key={index}>
            <h2>{player.playerName}</h2>
            <div className="stat-sheet">
              {player.stats.map((stat, statIndex) => (
                <div className="stat" key={statIndex}>
                  {stat.name}: {stat.value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default NHLLiveStats;
