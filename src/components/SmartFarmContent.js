
import React from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const SmartFarmContent = () => {
  return (
    <main className="smart-farm-content">
      <img src="background.jpg" alt="Farm Background  image" />
      <div className="content-overlay">
        <h1>Welcome to SmartFarm</h1>
        <button> <Link to="/login">Get Started</Link></button>
      </div>
      <Footer /> {/* Include the Footer component */}
    </main>
    
  );
};

export default SmartFarmContent;
