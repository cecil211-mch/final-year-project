import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './SmartFarmContent.css';

const SmartFarmContent = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/CreateAccountPage');
  };

  return (
    <div className="smart-farm-app">
      <Header />
      <main className="smart-farm-content">
        <div className="background-container">
          <img src="background.jpeg" alt="Farm Background" className="background-image" />
        </div>
        <div className="content-overlay">
          <h1>Welcome to SmartFarm</h1>
          <button onClick={handleGetStartedClick}>Get Started</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SmartFarmContent;
