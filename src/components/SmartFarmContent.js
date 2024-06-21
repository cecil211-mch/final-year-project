import React from 'react';
import Header from './Header';
import './SmartFarmContent.css'; 
import Footer from './Footer'; 
import { Link } from 'react-router-dom';

const SmartFarmContent = () => {
  return (
    <div className="smart-farm-app">  
      <Header /> 
      <main className="smart-farm-content">
        <img src="background.jpg" alt="Farm Background image" />
        <div className="content-overlay">
          <h1>Welcome to SmartFarm</h1>
          <button>
            <Link to="/login">Get Started</Link>
          </button>
        </div>
      </main>
      <Footer /> 
    </div>
  );
};

export default SmartFarmContent;
