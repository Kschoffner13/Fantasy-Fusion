import React, { useEffect } from 'react';
import '../Styles/landingHomePage.css';
import { Button } from '../Components/LoginButton/LoginButton';
import Navbar from '../Components/Navbar/Navbar';

const LandingPage = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Remove the inline style when the component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className='page'>
        <div className='Text'>
          <div className='Title'>
            <h1>Welcome to Fantasy Fusion</h1>
            <h2>The perfect mix of all your favorite fantasy sports in one place.</h2>
          </div>
          <div>
            <Button id='getstartedbutton' buttonStyle='btn--outline'>Get Started</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
