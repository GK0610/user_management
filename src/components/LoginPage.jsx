import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  AppBar,
  Toolbar,
} from '@mui/material';
import { validateUserCredentials, saveLoginState, saveCurrentUser } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import '../components/LoginPage.css'; // Import the CSS file

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (validateUserCredentials(email, password)) {
      saveLoginState(true);
      saveCurrentUser({ email });
      setIsLoggedIn(true);
      navigate('/users');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
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

      {/* Login Page Content */}
      <Box className="login-page">
        {/* Left-Side Background Image */}
        <Box className="login-image" />

        {/* Right-Side Login Form */}
        <Box className="login-container">
        <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
  Login
</Typography>
          <Box component="form" onSubmit={handleLogin} className="login-form">
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Log In
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/signup')}
              sx={{ mt: 2 }}
            >
              Don't have an account? Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
