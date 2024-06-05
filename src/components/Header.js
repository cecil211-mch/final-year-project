import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <div>
                   <h1>SmartFarm</h1>
                </div>
                
                <div className="nav-right">
                    <Link to="/create-account">Create Account</Link>
                    <Link to="/login">Login</Link>
                    <FontAwesomeIcon icon={faBell} className="notification-icon" />
                </div>
            </div>
        </header>
    );
}

export default Header;
