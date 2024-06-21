import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import './Analysis.css'; // Optional for styling

// Replace with your AI key retrieval logic (secure method)
const aiKey ="AIzaSyDkvjHplw2U8wleC5R6Tj05sNGdA7ZjfgQ";

const Analysis = () => {
  const [sensorData, setSensorData] = useState(null); // State for sensor data
  const [aiResults, setAiResults] = useState(null); // State for AI results

  // Fetch sensor data if needed (replace with your API call logic)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/sensor-data'); // Replace with your endpoint
      const data = await response.json();
      setSensorData(data);
    };
    fetchData();
  }, []);

  // Call AI analysis API when sensor data is available (replace with your logic)
  useEffect(() => {
    if (sensorData) {
      const makeAiCall = async () => {
        const response = await fetch('/api/ai-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...sensorData, aiKey }),
        });
        const results = await response.json();
        setAiResults(results);
      };
      makeAiCall();
    }
  }, [sensorData, aiKey]);

  // Display content based on data availability
  return (
    <div className="">
      <Header />
      {sensorData ? (
        <div>
          <h1>AI Analysis Results</h1>
          {/* Display AI results here using JSX or components */}
          <p>pH: {aiResults.phAnalysis}</p>
          <p>EC: {aiResults.ecAnalysis}</p>
          <p>SoilMoisture: {aiResults.soilmoistureAnalysis}</p>
          <p>Humidity: {aiResults.humidityAnalysis}</p>
          <p>Temperature: {aiResults.temperatureAnalysis}</p>
          {/* Add similar logic for other sensor data */}
        </div>
      ) : (
        <p>Loading sensor data and AI analysis...</p>
      )}
      <Footer />
    </div>
  );
};

export default Analysis;
