import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login'; // Assuming login.js is defined in the same 'src' folder
import Dashboard from './components/Dashboard'; // Assuming dashboard.js is defined in the same 'src' folder
import SmartFarmContent from './components/SmartFarmContent';
import CreateAccountPage from './components/CreateAccountPage';
import ForgotPassword from './components/ForgotPassword';
import Notification from './components/Notification';
import Settings from './components/Settings';
import Help from './components/Help';
import { Navigate } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<SmartFarmContent/>} />
        <Route path="/CreateAccountPage" element={<CreateAccountPage/>}/>
        <Route path="/login"element={<Login/>}/>
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Notification" element={<Notification/>}/>
        <Route path ="/Settings" element={<Settings/>}/>
        <Route path="/Help" element={<Help/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Redirect all other unmatched routes to Landing Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
