import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login'; // Assuming login.js is defined in the same 'src' folder
import Dashboard from './components/Dashboard'; // Assuming dashboard.js is defined in the same 'src' folder
import SmartFarmContent from './components/SmartFarmContent';
import CreateAccountPage from './components/CreateAccountPage';
import Analysis from './components/Analysis';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<SmartFarmContent/>} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/login"element={<Login/>}/>
        <Route path="/CreateAccountPage" element={<CreateAccountPage/>}/>
        <Route path="/Analysis" element={<Analysis/>}/>
      </Routes>
    </Router>
  );
};

export default App;
