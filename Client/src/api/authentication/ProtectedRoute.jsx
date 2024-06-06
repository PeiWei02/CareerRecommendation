import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "./useAuth"; // Import the custom hook

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Optionally add a loading indicator while checking auth status
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
