import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // path to your hook

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // show loading while checking

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
