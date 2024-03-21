import '../Styles/landingHomePage.css';
import LoginButton from '../Components/LoginButton/LoginButton';
import Navbar from '../Components/Navbar/Navbar';

const LandingPage = () => {


  return (
    <div className='landing-page-overflow-fix'>
      <Navbar />
      <div className='page'>
        <div className='Text'>
          <div className='Title'>
            <h1>Welcome to Fantasy Fusion</h1>
            <h2>The perfect mix of all your favorite fantasy sports in one place.</h2>
          </div>
          <div>
            <LoginButton id='getstartedbutton' buttonStyle='btn--outline'>Get Started</LoginButton>
          </div>
        </div>
      </div>
    </ div>
  );
};

export default LandingPage;
