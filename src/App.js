import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css'; // Import the CSS file
import Header from './components/Header';
import Footer from './components/Footer';
import SmartFarmContent from './components/SmartFarmContent';
import Login from './components/login'; // Assuming Login component
import CreateAccountPage from './components/CreateAccountPage'; // Import if created

const App = () => {
  return (
    <BrowserRouter>
      <Header /> {/* Include the Header component on all pages */}
      <Routes>
        <Route path="/" element={<SmartFarmContent />} /> {/* Landing Page */}
        <Route path="/login" element={<Login />} /> {/* Login Page */}
        <Route path="/create-account" element={<CreateAccountPage />} /> {/* Optional Create Account Page */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;