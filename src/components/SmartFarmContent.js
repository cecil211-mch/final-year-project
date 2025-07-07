import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './SmartFarmContent.css';

const SmartFarmContent = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/CreateAccountPage'); // ✅ fixed route
  };

  const handleLoginClick = () => {
    navigate('/login'); // ✅ assuming you have a login route too
  };

  return (
    <div className="smart-farm-app">
      <Header />
      <main className="smart-farm-main">
        <div className="smart-farm-container">
          <div className="smart-farm-text">
            <h1 className="smartfarm-title">Empowering Farmers with Smart Agriculture</h1>
            <p className="smartfarm-subtitle">
              Track soil nutrients, monitor weather conditions, and manage resources from anywhere.<br />
              Make informed decisions for better productivity and a greener future.
            </p>
            <div className="cta-buttons">
              <button onClick={handleGetStartedClick} className="btn-primary">Create Account</button>
              <button onClick={handleLoginClick} className="btn-primary">Login</button>
            </div>
          </div>
          <div className="smart-farm-illustration">
            <img src="/illustration-farm.svg" alt="Farm Technology Illustration" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SmartFarmContent;
