import axios from "axios";

// Normalize base URL from Vite env to avoid trailing slashes and index.php suffixes
const resolveBaseUrl = () => {
  const raw = import.meta.env?.VITE_BASE_URL || "";
  if (!raw) return "";

  // Remove a trailing `/index.php` (with or without trailing slash)
  const withoutIndexPhp = raw.replace(/\/index\.php\/?$/i, "");
  // Trim trailing slashes
  const trimmed = withoutIndexPhp.replace(/\/+$/g, "");
  return trimmed;
};

export const BASE_URL = resolveBaseUrl();

// Preconfigured Axios instance with retry logic
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
  timeout: 10000, // 10 second timeout
});

// Detect if we're in prerendering mode (react-snap)
const isPrerendering = typeof window !== "undefined" && 
  (window.navigator?.userAgent?.includes("HeadlessChrome") || 
   window.navigator?.userAgent?.includes("PhantomJS"));

// Suppress console errors during prerendering to avoid build noise
if (isPrerendering && typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args) => {
    // Suppress network/fetch errors during prerendering
    const message = args[0]?.toString() || "";
    if (!message.includes("Failed to fetch") && !message.includes("ERR_FAILED")) {
      originalError.apply(console, args);
    }
  };
}

// Add retry interceptor for failed requests
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // During prerendering, silently handle network errors to avoid build failures
    if (isPrerendering && !error.response) {
      // Don't log or retry - just fail silently
      // Components should handle empty states gracefully
      return Promise.reject(error);
    }

    // Don't retry if we've already tried or if it's not a network error
    if (config._retry || !error.response) {
      return Promise.reject(error);
    }

    // Only retry on 5xx server errors or network errors (but not during prerendering)
    if (!isPrerendering && (error.response?.status >= 500 || !error.response)) {
      config._retry = true;

      // Wait 1 second before retry
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return api(config);
    }

    return Promise.reject(error);
  }
);
