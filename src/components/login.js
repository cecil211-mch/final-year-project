import React from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom'; // For navigation to Create Account page

const login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome to SmartFarm</h2>
        <div className="login-form">
          <h3>Login</h3>
          <form>
            <label htmlFor="email">Enter Email Address</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="password">Enter Password</label>
            <input type="password" id="password" name="password" required />
            <button type="submit">Login</button> {/* Replace with actual form submission logic */}
          </form>
          <p>OR</p>
          <Link to="/create-account" style={{ color: 'black' }}>
  Don't have an account? <span style={{ color: 'green' }}>Create Account</span>
</Link>

        </div>
      </div>
      <Footer /> {/* Include the Footer component */}
    </div>
  );
};

export default login;
