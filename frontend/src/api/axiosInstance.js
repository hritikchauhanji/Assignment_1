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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // call refresh endpoint with plain axios
        await axios.post(
          `${BaseUrl}/api/v1/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        // mark user as logged in
        localStorage.setItem("isLoggedIn", "true");

        // retry original request
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
