import axiosInstance from "../api/axiosInstance";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" // read localStorage first
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        // Only call /auth/me if not already marked logged in
        if (!isLoggedIn) {
          await axiosInstance.get("/auth/me");
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
        }
      } catch (err) {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
      } finally {
        setLoading(false);
      }
    };

    // Delay slightly to allow cookies from redirect to be set
    const timeout = setTimeout(checkLogin, 50);

    return () => clearTimeout(timeout);
  }, []);

  return { isLoggedIn, loading };
};
