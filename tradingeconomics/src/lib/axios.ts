import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (apiKey) {
      config.headers.Authorization = apiKey;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
