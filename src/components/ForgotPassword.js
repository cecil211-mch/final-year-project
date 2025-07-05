import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../utils/firebase';
import Header from './Header';
import Footer from './Footer';
import './login.css'; // Reuse login styles

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('A password reset link has been sent to your email.');
      setEmail('');
    } catch (err) {
      setError('Failed to send reset email. Make sure the email is valid.');
      console.error('Password reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Header />
      <main className="login-main">
        <div className="login-card">
          <h1 className="login-title">Reset Your Password</h1>
          <form onSubmit={handleReset} className="login-form">
            <div className="form-group">
              <label htmlFor="resetEmail">Email Address</label>
              <input
                type="email"
                id="resetEmail"
                className="form-input"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          {message && <p className="loading-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <div className="login-divider"><span>OR</span></div>
          <p className="signup-link">
            Back to <span onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Login</span>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
