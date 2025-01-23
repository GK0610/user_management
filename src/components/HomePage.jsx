import React from 'react';
import { Typography, Box } from '@mui/material';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      {/* Background Image */}
      <div className="background-container"></div>

      {/* Content */}
      <div className="content-container">
        <Box className="content-box">
          <Typography variant="h3" gutterBottom>
            Welcome to User Management
          </Typography>
          <Typography variant="h6" gutterBottom>
            Manage your users efficiently with our platform.
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default HomePage;
