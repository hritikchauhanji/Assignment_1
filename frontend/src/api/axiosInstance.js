import axios from "axios";

const BaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: `${BaseUrl}/api/v1`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // send httpOnly cookies
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🚨 If login/register/google fails, don't attempt refresh
    if (
      originalRequest.url.includes("/auth/login") ||
      originalRequest.url.includes("/auth/register") ||
      originalRequest.url.includes("/auth/google")
    ) {
      return Promise.reject(error);
    }

    // ✅ Handle token refresh only for protected routes
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call refresh endpoint with plain axios
        await axios.post(
          `${BaseUrl}/api/v1/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        // keep user logged in
        localStorage.setItem("isLoggedIn", "true");

        // Retry original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("isLoggedIn");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
