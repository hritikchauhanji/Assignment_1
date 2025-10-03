import axiosInstance from "../api/axiosInstance"; // adjust the path if needed
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await axiosInstance.get("/auth/me"); // calls backend
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
      } catch (err) {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return { isLoggedIn, loading };
};
