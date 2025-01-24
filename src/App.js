import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'; // Use HashRouter for GitHub Pages
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import UsersPage from './components/UsersPage';
import HomePage from './components/HomePage';

import { getLoginState, saveLoginState, clearLoginState } from './utils/localStorage';

// NavBar Component
const NavBar = ({ isLoggedIn, handleLogout }) => {
  const location = useLocation();
  const hideNavBarRoutes = ['/login', '/signup'];

  // Hide NavBar on login/signup pages
  if (hideNavBarRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          User Management
        </Typography>
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit" href="#/login"> {/* Use hash links */}
              Login
            </Button>
            <Button color="inherit" href="#/signup"> {/* Use hash links */}
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

// App Component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state when the app first loads
  useEffect(() => {
    const savedLoginState = getLoginState();
    setIsLoggedIn(savedLoginState);
  }, []);

  // Update login state in localStorage
  useEffect(() => {
    saveLoginState(isLoggedIn);
  }, [isLoggedIn]);

  // Handle logout
  const handleLogout = () => {
    clearLoginState();
    setIsLoggedIn(false);
  };

  return (
    <Router> {/* Use HashRouter for GitHub Pages */}
      <Box>
        {/* Render the NavBar */}
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        {/* Main Routing */}
        <Routes>
          {/* Public Route: Home */}
          <Route path="/" element={<HomePage />} />

          {/* Login Page: Redirect if already logged in */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/users" />
              ) : (
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />

          {/* Signup Page: Redirect if already logged in */}
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/users" />
              ) : (
                <SignupPage setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />

          {/* Protected Route: Users Page */}
          <Route
            path="/users"
            element={isLoggedIn ? <UsersPage /> : <Navigate to="/login" />}
          />

          {/* Catch-All Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
