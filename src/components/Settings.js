import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, Sliders, LogOut } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import './Settings.css';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: 'Cecilia', email: 'user@example.com' });
  const [notifications, setNotifications] = useState({
    soilMoisture: true,
    temperature: true,
    humidity: false
  });
  const [thresholds, setThresholds] = useState({
    soilMoisture: 30,
    temperature: 20
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleNotificationToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handleThresholdChange = (e) => {
    setThresholds({ ...thresholds, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="settings-page">
      <Header />
      <main className="settings-container">
        <div className="settings-header">
          <Settings className="icon" />
          <h2>Settings</h2>
          <p>Manage your account, preferences, and system behavior</p>
        </div>

        {/* Profile Settings */}
        <section className="settings-section">
          <h3><Sliders className="inline-icon" /> Profile</h3>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={profile.name} onChange={handleProfileChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={profile.email} onChange={handleProfileChange} />
          </div>
        </section>

        {/* Notifications */}
        <section className="settings-section">
          <h3><Bell className="inline-icon" /> Notifications</h3>
          {Object.keys(notifications).map((key) => (
            <div key={key} className="toggle-group">
              <label>{key.charAt(0).toUpperCase() + key.slice(1)} Alerts</label>
              <input
                type="checkbox"
                checked={notifications[key]}
                onChange={() => handleNotificationToggle(key)}
              />
            </div>
          ))}
        </section>

        {/* System Thresholds */}
        <section className="settings-section">
          <h3><Sliders className="inline-icon" /> System Thresholds</h3>
          <div className="form-group">
            <label>Min Soil Moisture (%)</label>
            <input
              type="number"
              name="soilMoisture"
              value={thresholds.soilMoisture}
              onChange={handleThresholdChange}
            />
          </div>
          <div className="form-group">
            <label>Min Temperature (°C)</label>
            <input
              type="number"
              name="temperature"
              value={thresholds.temperature}
              onChange={handleThresholdChange}
            />
          </div>
        </section>

        {/* Action Buttons */}
        <div className="settings-actions">
          <button className="btn-save" onClick={handleSave}>Save Changes</button>
          <button className="btn-logout" onClick={handleLogout}>
            <LogOut className="inline-icon" /> Logout
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SettingsPage;
