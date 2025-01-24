// Save a key-value pair to localStorage with error handling
export const saveToLocalStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    // Handle storage limit error (for example, when the quota is exceeded)
    if (error.name === 'QuotaExceededError') {
      alert('Storage limit exceeded. Please clear some space in your browser storage.');
    }
  }
};

// Retrieve a value from localStorage with error handling
export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue; // Return the default value if any error occurs
  }
};

// Save user credentials to localStorage (Consider storing hashed passwords in real apps)
export const saveUserCredentials = (email, password, username) => {
  const users = getAllUserCredentials();
  users[email] = { password, username };
  saveToLocalStorage('users', users);
};

// Retrieve all stored user credentials
export const getAllUserCredentials = () => {
  return getFromLocalStorage('users', {});
};

// Validate user credentials
export const validateUserCredentials = (email, password) => {
  const users = getAllUserCredentials();
  return users[email]?.password === password; // Validate email/password
};

// Save login state
export const saveLoginState = (isLoggedIn) => {
  saveToLocalStorage('isLoggedIn', isLoggedIn);
};

// Get login state
export const getLoginState = () => {
  return getFromLocalStorage('isLoggedIn', false); // Default to false if no value is found
};

// Clear only login-related state, but retain user data
export const clearLoginState = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
};

// Save the currently logged-in user
export const saveCurrentUser = (user) => {
  saveToLocalStorage('currentUser', user);
};

// Get the currently logged-in user
export const getCurrentUser = () => {
  return getFromLocalStorage('currentUser');
};

// Check if an email or username is already registered
export const isEmailOrUsernameTaken = (email, username) => {
  const users = getAllUserCredentials();
  if (users[email]) return true; // Email exists
  return Object.values(users).some((user) => user.username === username); // Username exists
};

// Clear a specific user's credentials (optional, but included for completeness)
export const clearUserCredentials = (email) => {
  const users = getAllUserCredentials();
  if (users[email]) {
    delete users[email];
    saveToLocalStorage('users', users);
  }
};
