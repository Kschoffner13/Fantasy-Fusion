import React, { useState, useEffect } from 'react';
import  LoginButton  from '../LoginButton/LoginButton';
import { Link } from 'react-router-dom';
import './style.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      showButton();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo'>
            Fantasy Fusion
            <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/howtoplay' className='nav-links'>
                How to Play
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/nbastats' className='nav-links'>
                NBA Stats
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/nhlstats' className='nav-links'>
                NHL Stats
              </Link>
            </li>

            <li>
              <Link to='/sign-up' className='nav-links-mobile'>
                Log In
              </Link>
            </li>
          </ul>
          {button && <LoginButton buttonStyle='btn--outline'>LOG IN</LoginButton>}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
