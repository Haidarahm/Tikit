import axios from "axios";

// Normalize base URL from Vite env to avoid trailing slashes and index.php suffixes
const resolveBaseUrl = (): string => {
  const raw: string = ((import.meta as any).env?.VITE_BASE_URL as string) || "";
  if (!raw) return "";

  // Remove a trailing `/index.php` (with or without trailing slash)
  const withoutIndexPhp = raw.replace(/\/index\.php\/?$/i, "");
  // Trim trailing slashes
  const trimmed = withoutIndexPhp.replace(/\/+$/g, "");
  return trimmed;
};

export const BASE_URL: string = resolveBaseUrl();

// Preconfigured Axios instance with retry logic
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
  timeout: 10000, // 10 second timeout
});

// Add retry interceptor for failed requests
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    
    // Don't retry if we've already tried or if it's not a network error
    if (config._retry || !error.response) {
      return Promise.reject(error);
    }
    
    // Only retry on 5xx server errors or network errors
    if (error.response?.status >= 500 || !error.response) {
      config._retry = true;
      
      // Wait 1 second before retry
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return api(config);
    }
    
    return Promise.reject(error);
  }
);


