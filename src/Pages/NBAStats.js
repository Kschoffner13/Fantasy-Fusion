import React, { useEffect, useState } from 'react';
import '../Styles/NBAStats.css';
import Navbar from '../Components/Navbar/Navbar';

const NBALiveStats = () => {
  const [playerStats, setPlayerStats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlayerStats, setFilteredPlayerStats] = useState([]);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const mockPlayerStats = [
        { playerName: 'Player 1', stats: [
          { name: 'Points', value: 25 },
          { name: 'Assists', value: 10 },
          { name: 'Rebounds', value: 5 }
        ] },
        { playerName: 'Player 2', stats: [
          { name: 'Points', value: 30 },
          { name: 'Assists', value: 8 },
          { name: 'Rebounds', value: 12 }
        ] },
        { playerName: 'Player 3', stats: [
          { name: 'Points', value: 20 },
          { name: 'Assists', value: 15 },
          { name: 'Rebounds', value: 8 }
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
    <Navbar />
      <h1>NBA Stats</h1>
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
};

export default NBALiveStats;
