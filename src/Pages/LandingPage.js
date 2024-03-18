import React from 'react';
import '../../App.css';
import '../Styles/LandingPage.css'
import { Button } from '../Button';

function LandingPage() {
  return (
      <div className='whole-page'>
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
  );
}

export default LandingPage;
