import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { ref, set } from 'firebase/database';
import { auth, db } from '../utils/firebase';
import Header from './Header';
import Footer from './Footer';
import './CreatAccountPage.css';

const CreateAccountPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [telephone, setTelephone] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Reset all fields when the component mounts
    setFullName('');
    setEmail('');
    setPassword('');
    setLocation('');
    setTelephone('');
    setError('');
    setSuccessMessage('');
  }, []);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setFullName('');
        setEmail('');
        setPassword('');
        setLocation('');
        setTelephone('');
        setSuccessMessage('');
      }, 2000);
    }
  }, [successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!validateInputs()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      const userRef = ref(db, `users/${userId}`);

      await set(userRef, {
        fullName,
        email,
        location,
        telephone,
      });

      await sendEmailVerification(auth.currentUser);

      setSuccessMessage('Account created successfully! Please check your email to verify your account.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error("Error creating account:", error);
      if (error.code === 'auth/email-already-in-use') {
        setError('Email address already in use. Please try a different email.');
      } else {
        setError('Failed to create an account. Please try again.');
      }
    }
  };

  const validateInputs = () => {
    if (!fullName || !email || !password || !location || !telephone) {
      setError('All fields are required.');
      return false;
    }
    if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError('Invalid email format.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    if (!/^\+?[1-9]\d{1,14}$/.test(telephone)) {
      setError('Invalid phone number format.');
      return false;
    }
    return true;
  };

  return (
    <div className="create-account-container">
      <Header />
      <main className="create-account-content">
        <div className="create-account-card">
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="input-group">
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <label htmlFor="fullName">Full Name</label>
            </div>
            <div className="input-group">
              <input
                type="tel"
                id="telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                required
              />
              <label htmlFor="telephone">Phone Number</label>
            </div>
            <div className="input-group">
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <label htmlFor="location">Location</label>
            </div>
            <div className="input-group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Email Address</label>
            </div>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-group">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <button type="submit" className="submit-btn">Create Account Now</button>
          </form>
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateAccountPage;