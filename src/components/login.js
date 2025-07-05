import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import Header from './Header';
import Footer from './Footer';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEmail('');
    setPassword('');
    setError(null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (window.location.pathname !== '/login') {
          navigate('/dashboard');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
      setEmail('');
      setPassword('');
      setIsLoading(false);
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Header />
      <main className="login-main">
        <div className="login-card">
          <h1 className="login-title">Welcome to SmartFarm</h1>
          <div>
            <h2 className="login-subtitle">Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
                <label htmlFor="showPassword">Show Password</label>
              </div>

              {/* Buttons side-by-side */}
              <div className="login-actions">
                <button type="submit" className="login-button" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <Link to="/forgot-password" className="forgot-password-inline">
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="login-divider">
            <span>OR</span>
          </div>
          <p className="signup-link">
            Don't have an account? <Link to="/CreateAccountPage">Create Account</Link>
          </p>
          {isLoading && <p className="loading-message">Logging in...</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
