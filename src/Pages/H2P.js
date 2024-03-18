import React from 'react';
import '../../App.css';
import '../Styles/H2P.css';

function H2P() {
  return (
      <div className='how2playpage'>
        <div className='Instructions'>
          <h1>How to Play Fusion Fantasy</h1>
          <div id='stepOne'>
            <h2>Join a league</h2>
            <h3>Join a pre-existing league with your friend, or make a new one</h3>
          </div>
          <div id='stepTwo'>
            <h2>Draft your players</h2>
            <h3>Get the players that you think will perform the best</h3>
          </div>
          <div id='stepThree'>
            <h2>Update your weekly roster</h2>
            <h3>Change your lineup to maximize your points</h3>
          </div>
        </div>
      </div>
  );
}

export default H2P;
