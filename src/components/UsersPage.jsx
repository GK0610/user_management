import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Drawer,
  Box,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getFromLocalStorage } from '../utils/localStorage';
import './UsersPage.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const isLoggedIn = getFromLocalStorage('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login if not logged in
    }
  }, [navigate]);

  // Fetch users on page load or when the page changes
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    const limit = 12;
    const skip = (page - 1) * limit;

    try {
      const response = await fetch(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}&select=firstName,lastName,age,gender,email,image,phone,bloodGroup,university`
      );
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedUser(null);
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  return (
    <Box>
      {/* Main Content */}
      <Container className="users-page" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          User List
        </Typography>
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card
                className="user-card"
                onClick={() => handleUserClick(user)}
                sx={{ cursor: 'pointer', boxShadow: 3 }}
              >
                <CardMedia
                  component="img"
                  alt={user.firstName}
                  height="140"
                  image={user.image}
                  className="user-image"
                />
                <CardContent>
                  <Typography variant="h6">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="body2">Email: {user.email}</Typography>
                  <Typography variant="body2">Phone: {user.phone}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box
          className="pagination"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 3,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIosIcon />}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(-1)}
            sx={{ mx: 1 }}
          >
            Previous
          </Button>
          <Typography variant="body1" className="page-info" sx={{ mx: 2 }}>
            Page {currentPage}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIosIcon />}
            onClick={() => handlePageChange(1)}
            sx={{ mx: 1 }}
          >
            Next
          </Button>
        </Box>

        {/* Drawer for User Details */}
        <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
          {selectedUser && (
            <Box className="drawer-content" p={3} sx={{ width: 300 }}>
              <Typography variant="h5" gutterBottom>
                {selectedUser.firstName} {selectedUser.lastName}
              </Typography>
              <Typography variant="body1">Age: {selectedUser.age}</Typography>
              <Typography variant="body1">Gender: {selectedUser.gender}</Typography>
              <Typography variant="body1">Email: {selectedUser.email}</Typography>
              <Typography variant="body1">Phone: {selectedUser.phone}</Typography>
              <Typography variant="body1">
                Blood Group: {selectedUser.bloodGroup}
              </Typography>
              <Typography variant="body1">
                University: {selectedUser.university}
              </Typography>
            </Box>
          )}
        </Drawer>
      </Container>
    </Box>
  );
};

export default UsersPage;
