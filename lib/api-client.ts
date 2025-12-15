import axios from "axios";

// Create axios instance with base URL
export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add response interceptor to handle errors
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized errors (e.g., token expired)
        if (error.response && error.response.status === 401) {
            // TODO: Implement token refresh logic or redirect to login
            if (typeof window !== "undefined") {
                // Only redirect if we're not already on the login page
                if (!window.location.pathname.startsWith("/login")) {
                    // localStorage.removeItem("token");
                    // window.location.href = "/login";
                }
            }
        }
        return Promise.reject(error);
    }
);

// Add request interceptor to attach JWT token
apiClient.interceptors.request.use(
    (config) => {
        // Get token from localStorage (if we're in the browser)
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("access_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
