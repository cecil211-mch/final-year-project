import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For navigation
import Footer from './Footer'; // Assuming Footer component is defined elsewhere
import './Dashboard.css';
import Header  from './Header';
import { Card } from 'react-bootstrap';

// Placeholder sensor data (replace with actual data fetching logic)
const sensorData = {
  pH: 6.5,
  EC: 0.35,
  temperature: 25,
  humidity: 60,
  soilMoisture: 30,
};

const Dashboard = () => {
  return (
    
    <div className="">
        <Header/>
      
      <div className="sensor-cards">
        <div className="sensor-card">
          <h3>pH</h3>
          <p>{sensorData.pH}</p>
        </div>
        <div className="sensor-card">
          <h3>EC (mS/cm)</h3>
          <p>{sensorData.EC}</p>
        </div>
        <div className="sensor-card">
          <h3>Temperature (°C)</h3>
          <p>{sensorData.temperature}</p>
        </div>
        <div className="sensor-card">
          <h3>Humidity (%)</h3>
          <p>{sensorData.humidity}</p>
        </div>
        <div className="sensor-card">
          <h3>Soil Moisture (%)</h3>
          <p>{sensorData.soilMoisture}</p>
        </div>
      </div>
      <Link to="/analysis" className="analysis-button">
        View Analysis with AI
      </Link>
      <Footer />
    </div>
  );
};

export default Dashboard;
