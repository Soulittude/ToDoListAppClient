import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => {
        console.log('Response received:', response.config.url, response.status);
        return response;
    },
    (error) => {
        console.error('Request failed:', error.config?.url, error.response?.status);
        // Automatically handle 401 errors
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        // Format error message for components
        const message = error.response?.data?.error || error.message;
        return Promise.reject(new Error(message));
    }
);

// Health check function.
export const checkBackendHealth = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/health`,
            { timeout: 3000 } // Add timeout
        );
        return response.status === 200;
    } catch (error) {
        return false;
    }
};

export default api;