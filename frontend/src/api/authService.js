import axiosInstance from "./axiosInstance";

// Login
export const login = async (data) => {
  const res = await axiosInstance.post("/auth/login", data, {
    withCredentials: true, // important to store httpOnly cookies
  });
  // Save login state for route protection
  localStorage.setItem("isLoggedIn", "true");
  return res.data;
};

// Register
export const register = async (data) => {
  const res = await axiosInstance.post("/auth/register", data, {
    withCredentials: true,
  });
  return res.data;
};

// Logout
export const logout = async () => {
  await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
  localStorage.removeItem("isLoggedIn"); // clear login state
};

// Get current user (optional helper)
export const getCurrentUser = async () => {
  const res = await axiosInstance.get("/auth/me", { withCredentials: true });
  return res.data;
};
