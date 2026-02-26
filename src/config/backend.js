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

    // Retry limit (max 2 retries = 3 total attempts)
    const retryCount = config._retryCount ?? 0;
    const maxRetries = 2;

    if (retryCount >= maxRetries) {
      return Promise.reject(error);
    }

    // Retry on: 5xx server errors, timeout (ECONNABORTED), or network errors (no response)
    const isTimeout = error.code === "ECONNABORTED";
    const isNetworkError = !error.response;
    const isServerError = error.response?.status >= 500;
    const isRetryable = isTimeout || isNetworkError || isServerError;

    if (!isPrerendering && isRetryable) {
      config._retryCount = retryCount + 1;

      // Wait 1–2 seconds before retry (longer for timeout/network)
      const delay = isTimeout || isNetworkError ? 2000 : 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));

      return api(config);
    }

    return Promise.reject(error);
  }
);
