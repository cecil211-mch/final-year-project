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
    Nitrogen: 0,
    Phosphorus: 0,
    Potassium: 0,
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
    const NitrogenRef = ref(db, `Readings/Nitrogen`);
    const PhosphorusRef = ref(db, `Readings/Phosphorus`);
    const PotassiumRef = ref(db, `Readings/Potassium`);
    const humidityRef = ref(db, `Readings/humidity`);
    const soilMoistureRef = ref(db, `Readings/soilMoisture`);
    const temperatureRef = ref(db, `Readings/temperature`);
    const unsubscribeNitrogen = onValue(NitrogenRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(prevData => ({ ...prevData, Nitrogen: data }));
      }
    });
    const unsubscribePhosphorus = onValue(PhosphorusRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(prevData => ({ ...prevData, Phosphorus: data }));
      }
    });
    const unsubscribePotassium = onValue(PotassiumRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(prevData => ({ ...prevData, Potassium: data }));
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
      unsubscribeNitrogen();
      unsubscribePhosphorus();
      unsubscribePotassium();
      unsubscribeTemperature();
      unsubscribeHumidity();
      unsubscribeSoilMoisture();
    };
  }, [navigate]);

  const getSensorCardClass = (value, type) => {
    const thresholds = {
      Nitrogen: { low: 20, high: 40 },      // N levels in ppm
      Phosphorus: { low: 10, high: 25 },    // P levels in ppm  
      Potassium: { low: 150, high: 300 },   // K levels in ppm
      temperature: { low: 20, high: 30 },
      humidity: { low: 40, high: 60 },
      soilMoisture: { low: 30, high: 70 }
    };

    // Add safety check to prevent undefined error
    if (!thresholds[type]) {
      return 'sensor-card optimal'; // default fallback
    }

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
          <div className={getSensorCardClass(sensorData.Nitrogen, 'Nitrogen')}>
            <Droplet className="sensor-icon" />
            <h2>Nitrogen</h2>
            <p className="sensor-value">{sensorData.Nitrogen.toFixed(0)}</p>
          </div>
          <div className={getSensorCardClass(sensorData.Phosphorus, 'Phosphorus')}>
            <Droplet className="sensor-icon" />
            <h2>Phosphorus</h2>
            <p className="sensor-value">{sensorData.Phosphorus.toFixed(0)}</p>
          </div>
          <div className={getSensorCardClass(sensorData.Potassium, 'Potassium')}>
            <Droplet className="sensor-icon" />
            <h2>Potassium</h2>
            <p className="sensor-value">{sensorData.Potassium.toFixed(0)}</p>
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
              <Line type="monotone" dataKey="Nitrogen" stroke="#8884d8" />
              <Line type="monotone" dataKey="Phosphorus" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Potassium" stroke="#ffc658" />
              <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
              <Line type="monotone" dataKey="humidity" stroke="#387908" />
              <Line type="monotone" dataKey="soilMoisture" stroke="#8dd1e1" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;