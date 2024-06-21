import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './Dashboard.css';
import Header from './Header';
import { Card } from 'react-bootstrap'; // Assuming you're using Bootstrap for cards

const sensorData = {
  pH: 6.5,
  EC: 0.35,
  Temperature: 25,
  Humidity: 60,
  SoilMoisture: 30,
};

const Dashboard = () => {
  return (
    <div className="">
      <Header />

      <div className="sensor-cards">
        {/* Row container for cards */}
        <div className="d-flex flex-row justify-content-around">
          {Object.entries(sensorData).map(([key, value]) => (
            <Card key={key} className="sensor-card mx-2">
              {/* Card header */}
              <Card.Header>{key}</Card.Header>
              {/* Card body */}
              <Card.Body>
                <Card.Title>{value}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      <Link to="/Analysis" className="analysis-button">
        View Analysis
      </Link>
      <Footer />
    </div>
  );
};

export default Dashboard;
