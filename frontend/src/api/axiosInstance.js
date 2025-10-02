import axios from "axios";

const BaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: `${BaseUrl}/api/v1`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // important for httpOnly cookies
});

// Response interceptor to handle 401 and auto-refresh access token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 error and request not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call refresh token endpoint
        await axiosInstance.post("/auth/refresh-token");

        // Retry original request after refresh
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Optional: clear login state if refresh fails
        localStorage.removeItem("isLoggedIn");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
