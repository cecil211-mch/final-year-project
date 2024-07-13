import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';
import { auth, db } from '../utils/firebase';
import Header from './Header';
import Footer from './Footer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Droplet, Thermometer, Wind, Sprout } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    pH: 0,
    temperature: 0,
    humidity: 0,
    soilMoisture: 0
  });
  const [historicalData, setHistoricalData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/login');
      return;
    }

    // Create references to the specific sensor paths in the database
    const pHRef = ref(db, `Readings/PH`);
    const humidityRef = ref(db, `Readings/humidity`);
    const soilMoistureRef = ref(db, `Readings/soilMoisture`);
    const temperatureRef = ref(db, `Readings/temperature`);
    const unsubscribePH = onValue(pHRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(prevData => ({ ...prevData, pH: data }));
      }
    });

    const unsubscribeTemperature = onValue(temperatureRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(prevData => ({ ...prevData, temperature: data }));
      }
    });

    const unsubscribeHumidity = onValue(humidityRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(prevData => ({ ...prevData, humidity: data }));
      }
    });

    const unsubscribeSoilMoisture = onValue(soilMoistureRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(prevData => ({ ...prevData, soilMoisture: data }));
      }
    });

    return () => {
      unsubscribePH();
      unsubscribeTemperature();
      unsubscribeHumidity();
      unsubscribeSoilMoisture();
    };
  }, [navigate]);

  const getSensorCardClass = (value, type) => {
    const thresholds = {
      pH: { low: 6, high: 7 },
      temperature: { low: 20, high: 30 },
      humidity: { low: 40, high: 60 },
      soilMoisture: { low: 30, high: 70 }
    };

    if (value < thresholds[type].low) return 'sensor-card low';
    if (value > thresholds[type].high) return 'sensor-card high';
    return 'sensor-card optimal';
  };

  return (
    <div className="dashboard">
      <Header />
      <main>
        <h1>Smart Farm Dashboard</h1>
        <div className="sensor-grid">
          <div className={getSensorCardClass(sensorData.pH, 'pH')}>
            <Droplet className="sensor-icon" />
            <h2>pH Level</h2>
            <p className="sensor-value">{sensorData.pH.toFixed(0)}</p>
          </div>
          <div className={getSensorCardClass(sensorData.temperature, 'temperature')}>
            <Thermometer className="sensor-icon" />
            <h2>Temperature</h2>
            <p className="sensor-value">{sensorData.temperature.toFixed(2)}°C</p>
          </div>
          <div className={getSensorCardClass(sensorData.humidity, 'humidity')}>
            <Wind className="sensor-icon" />
            <h2>Humidity</h2>
            <p className="sensor-value">{sensorData.humidity.toFixed(2)}%</p>
          </div>
          <div className={getSensorCardClass(sensorData.soilMoisture, 'soilMoisture')}>
            <Sprout className="sensor-icon" />
            <h2>Soil Moisture</h2>
            <p className="sensor-value">{sensorData.soilMoisture.toFixed(0)}%</p>
          </div>
        </div>
        <div className="chart-container">
          <h2>Historical Data</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pH" stroke="#8884d8" />
              <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
              <Line type="monotone" dataKey="humidity" stroke="#ffc658" />
              <Line type="monotone" dataKey="soilMoisture" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;