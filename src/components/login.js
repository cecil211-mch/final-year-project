import React from 'react';
import './login.css';
import Header from './Header'; 
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login-page">
      <Header /> 
      <div className="login-container">
       
        <div className="login-form">
          <h3>Login</h3>
          <form>
            <label htmlFor="email">Enter Email Address</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="password">Enter Password</label>
            <input type="password" id="password" name="password" required />
            <Link to="../Dashboard"><button type="submit">Login</button></Link>
          </form>
          <p>OR</p>
          <Link to="/CreateAccountPage" style={{ color: 'black' }}>
            Don't have an account? <span style={{ color: 'green' }}>Create Account</span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
