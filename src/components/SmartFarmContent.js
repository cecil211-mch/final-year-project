import React from 'react';
import Header from './Header'; // Assuming Header is defined elsewhere
import Footer from './Footer'; // Assuming Footer is defined elsewhere
import { Link } from 'react-router-dom';

const SmartFarmContent = () => {
  return (
    <div className="smart-farm-app">  {/* Wrap everything in a container */}
      <Header /> {/* Add Header component here */}
      <main className="smart-farm-content">
        <img src="background.jpg" alt="Farm Background image" />
        <div className="content-overlay">
          <h1>Welcome to SmartFarm</h1>
          <button>
            <Link to="/login">Get Started</Link>
          </button>
        </div>
      </main>
      <Footer /> {/* Include the Footer component */}
    </div>
  );
};

export default SmartFarmContent;
