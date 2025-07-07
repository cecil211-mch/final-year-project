import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    // Store where to redirect after login
    localStorage.setItem('redirectAfterLogin', '/Notification');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1>SmartFarm</h1>
        </div>

        <div className="nav-right">
          <Link to="/CreateAccountPage">Create Account</Link>
          <Link to="/login">Login</Link>
          <Link to="/Settings">Settings</Link>
          <Link to="/Help">Help</Link>
          <FontAwesomeIcon 
            icon={faBell} 
            className="notification-icon" 
            style={{ cursor: 'pointer' }}
            onClick={handleNotificationClick}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
