import axios from "axios";
import { apiEnvConfig } from "@/packages/env/api.env";
import { attachAuthInterceptors } from "./axios/interceptor.axios";

/**
 * The one axios instance for the auth backend. `withCredentials` is safe in both API
 * modes: same-origin requests send cookies regardless, and cross-origin ones need it.
 */
export const apiClient = axios.create({
  baseURL: apiEnvConfig.API_URL,
  timeout: apiEnvConfig.API_TIMEOUT_MS,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

attachAuthInterceptors(apiClient);

export { apiEnvConfig };
