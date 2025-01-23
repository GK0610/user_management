import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Alert,
  AppBar,
  Toolbar,
} from '@mui/material';
import { saveUserCredentials, isEmailOrUsernameTaken } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); // Added username
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate terms of use
    if (!termsAccepted) {
      setError('You must agree to the Terms of Use.');
      return;
    }

    // Validate passwords match
    if (password !== repeatPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Validate required fields
    if (!fullName || !email || !username || !password) {
      setError('All fields are required.');
      return;
    }

    // Check if email or username is already registered
    if (isEmailOrUsernameTaken(email, username)) {
      setError('Email or username is already in use.');
      return;
    }

    // Save user credentials
    saveUserCredentials(email, password, username);
    alert('Signup successful! You can now log in.');
    navigate('/login');
  };

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'left' }}>
            User Management
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
        </Toolbar>
      </AppBar>

      {/* Signup Content */}
      <Box className="signup-page">
        {/* Left Image Section */}
        <Box className="signup-image"></Box>

        {/* Right Signup Form Section */}
        <Box className="signup-container">
          <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Sign Up
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Full Name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <TextField
              label="Email Address"
              fullWidth
              variant="outlined"
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Username"
              fullWidth
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              label="Repeat Password"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
              }
              label="I agree to the Terms of Use"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/login')}
              sx={{ mt: 2 }}
            >
              Already have an account? Log In
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
