import React from 'react';
import Header from './Header'; 
import Footer from './Footer'; 
import './CreatAccountPage.css';
import { Link } from 'react-router-dom'; 

const CreateAccountPage = () => {
  return (
    <div className="create-account-page">
      <Header /> 
      <div className="content-container">  
        <div className="welcome-container">
          <h2>Welcome to SmartFarm</h2>
        </div>
        <div className="form-container">
          <h3>Create Account</h3>
          <div>
            <form>
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" required />
              <label htmlFor="tel">Phone Number</label>
              <input type="tel" id="tel" name="tel" required />
              <label htmlFor="location">Location</label>
              <input type="text" id="location" name="location" required />
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
              <label htmlFor="password">Enter Password</label>
              <input type="password" id="password" name="password" required />
              <button type="submit">Create Account Now</button>
            </form>
          </div>
          <p>
            <Link to="/login" style={{ color: 'black' }}>
              Already having an account? <span style={{ color: 'green' }}>Login</span>
            </Link>
          </p>
        </div>
      </div>
      <Footer /> 
    </div>
  );
};

export default CreateAccountPage;
