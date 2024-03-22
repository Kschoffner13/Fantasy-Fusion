import '../Styles/howToPlayPage.css';
import Navbar from '../Components/Navbar/Navbar';

const HowToPlay = () => {


  return (
    <div className='overflow-fix'>
      <Navbar />
      <div className='how-to-play-page'>
        <div className='instructions'>
          <h1>How to Play Fusion Fantasy</h1>
          <div id='step-one'>
            <h2>Join a league</h2>
            <h3>Join a pre-existing league with your friend, or make a new one</h3>
          </div>
          <div id='step-two'>
            <h2>Draft your players</h2>
            <h3>Get the players that you think will perform the best</h3>
          </div>
          <div id='step-three'>
            <h2>Update your weekly roster</h2>
            <h3>Change your lineup to maximize your points</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
