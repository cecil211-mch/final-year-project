import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../utils/firebase';
import Header from './Header';
import Footer from './Footer';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleReset = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setError('');
    setMessage('');
    
    // Validate email format
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    setIsLoading(true);

    try {
      // Send password reset email - simplified version without action code settings
      await sendPasswordResetEmail(auth, email);
      
      setMessage('A password reset link has been sent to your email address. Please check your inbox and spam folder.');
      setIsSubmitted(true);
      
      // Optional: Clear email after successful submission
      // setEmail('');
      
    } catch (err) {
      console.error('Password reset error:', err);
      console.error('Error code:', err.code);
      console.error('Error message:', err.message);
      
      // Handle specific Firebase errors
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No account found with this email address. Please check your email or sign up for a new account.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/too-many-requests':
          setError('Too many password reset attempts. Please wait a few minutes before trying again.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your internet connection and try again.');
          break;
        case 'auth/configuration-not-found':
          setError('Email configuration error. Please contact support.');
          break;
        case 'auth/invalid-continue-uri':
          setError('Invalid redirect URL configuration. Please contact support.');
          break;
        default:
          setError(`Failed to send reset email: ${err.message}. Please try again or contact support.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resending reset email
  const handleResend = () => {
    setIsSubmitted(false);
    setMessage('');
    setError('');
  };

  return (
    <div className="login-container">
      <Header />
      <main className="login-main">
        <div className="login-card">
          <h1 className="login-title">Reset Your Password</h1>
          
          {!isSubmitted ? (
            <>
              <p className="reset-description">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
              <form onSubmit={handleReset} className="login-form">
                <div className="form-group">
                  <label htmlFor="resetEmail">Email Address</label>
                  <input
                    type="email"
                    id="resetEmail"
                    className={`form-input ${error ? 'error' : ''}`}
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      // Clear error when user starts typing
                      if (error) setError('');
                    }}
                    required
                    disabled={isLoading}
                    autoComplete="email"
                  />
                </div>

                <button 
                  type="submit" 
                  className="login-button" 
                  disabled={isLoading || !email.trim()}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <div className="reset-success">
              <div className="success-icon">✓</div>
              <h2>Check Your Email</h2>
              <p>We've sent a password reset link to:</p>
              <p className="email-highlight">{email}</p>
              <p>
                If you don't see the email in your inbox, please check your spam folder.
                The link will expire in 1 hour.
              </p>
              <button 
                onClick={handleResend}
                className="resend-button"
                type="button"
              >
                Didn't receive the email? Try again
              </button>
            </div>
          )}

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <div className="login-divider"><span>OR</span></div>
          
          <p className="signup-link">
            Back to{' '}
            <span 
              onClick={() => navigate('/login')} 
              className="link-text"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate('/login');
                }
              }}
            >
              Login
            </span>
          </p>
          
          <p className="signup-link">
            Don't have an account?{' '}
            <span 
              onClick={() => navigate('/CreatAccountPage')} 
              className="link-text"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate('/CreatAccountPage');
                }
              }}
            >
              Sign up
            </span>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;