import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const GoogleSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        // Validate httpOnly cookie
        await axiosInstance.get("/auth/me", { withCredentials: true });
        navigate("/dashboard");
      } catch (err) {
        console.error("Google login failed", err);
        navigate("/login");
      }
    };
    verifyLogin();
  }, []);

  return <div>Logging in with Google...</div>;
};

export default GoogleSuccess;
