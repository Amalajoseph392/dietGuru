import React, { createContext, useState } from 'react';

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('authToken'));

  // Function to log in (sets token and updates state)
  const login = (token) => {
    sessionStorage.setItem('authToken', token); // Store token in sessionStorage
    setIsLoggedIn(true); // Update login state
  };

  // Function to log out (clears token and updates state)
  const logout = () => {
    sessionStorage.removeItem('authToken'); // Remove token from sessionStorage
    setIsLoggedIn(false); // Update login state
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
