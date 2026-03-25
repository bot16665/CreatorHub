import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Create the AuthContext
 * This context will hold authentication-related state and functions
 */
const AuthContext = createContext();

/**
 * AuthProvider component
 * Wraps the application and provides authentication state to all components
 */
export const AuthProvider = ({ children }) => {
  // State to store the logged-in user
  const [user, setUser] = useState(null);

  // State to store the JWT token
  const [token, setToken] = useState(null);

  // State to track if the app is loading (checking localStorage)
  const [loading, setLoading] = useState(true);

  /**
   * Load token from localStorage on component mount
   * This ensures user stays logged in after page refresh
   */
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  /**
   * Login function
   * Receives user data and token, saves them to state and localStorage
   */
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);

    // Save token and user to localStorage
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  /**
   * Logout function
   * Clears user and token from state and localStorage
   */
  const logout = () => {
    setUser(null);
    setToken(null);

    // Remove token and user from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  /**
   * Create the context value object
   */
  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use the AuthContext
 * Makes it easy to access authentication state in any component
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
