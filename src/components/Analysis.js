import React from 'react';
import Header from './Header';
import './Analysis.css';
import Footer from './Footer';

const Analysis = () => {
  return (
    <div className="analysis-page">
      <Header /> 
      <h2>AI Analysis</h2>
      <p>This page will show the AI analysis of the sensor data.</p>
      <Footer/>
    </div>
  
  );
};

export default Analysis;
