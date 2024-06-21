import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Analysis = () => {
  return (
    <div className="analysis-page">
      <Header /> {/* Add the Header component here */}
      <h2>AI Analysis</h2>
      <p>This page will show the AI analysis of the sensor data.</p>
      <Footer/>
    </div>
  
  );
};

export default Analysis;
