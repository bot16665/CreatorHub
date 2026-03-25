import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute Component
 * Protects routes by checking if user is authenticated
 * If not authenticated, redirects to login page
 * If authenticated, renders the nested routes via Outlet
 */
const ProtectedRoute = () => {
  // Get authentication state from AuthContext
  const { token, loading } = useAuth();

  // Show nothing while checking authentication status
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not logged in (no token), redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, render the nested routes
  return <Outlet />;
};

/**
 * Export the ProtectedRoute component
 */
export default ProtectedRoute;
