"server-only";
import axios from "axios";
import { toast } from "sonner";
import { logoutAPI } from "./api.auth";
import { store } from "../store/store";
import { logout } from "../store/features/authSlice";
import { envBackendConfig } from "../env/env.backend";

const isDev = process.env.NODE_ENV === "development";
const baseURL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  envBackendConfig.APP_BACKEND_API_URL;

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Ensures cookies are sent with every request
});

// 🧠 Request interceptor (optional for logging)
axiosInstance.interceptors.request.use((config) => {
  if (isDev) console.log("[Axios Request]", config);
  return config;
});

// 🔁 Response interceptor: handle 401 and refresh
axiosInstance.interceptors.response.use(
  (response) => {
    if (isDev) console.log("[Axios Response]", response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 🛑 Prevent infinite retry loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔄 Attempt refresh
        const refreshResponse = await axios.post(
          `${baseURL}/auth/profile`,
          {},
          { withCredentials: true }
        );

        if (refreshResponse.status === 200) {
          // 🔁 Retry original request
          return axiosInstance(originalRequest);
        } else {
          const res = await logoutAPI();
          if (res.status === "success") {
            store.dispatch(logout());
            toast.success("Logged out!");
            toast.error("Session expired. Please log in again.");
          }
        }
      } catch (refreshError) {
        console.error("[Token Refresh Failed]", refreshError);
        toast.error("Authentication failed. Please log in again.");
        // Optional: redirect to login or clear session
      }
    } else {
      // 🧠 Show meaningful error messages
      const message =
        error.response?.data?.details ||
        error.response?.data?.message ||
        error.message;

      toast.error(message || "Something went wrong.");
    }

    console.error("[Axios Error]", error);
    return Promise.reject(error);
  }
);
