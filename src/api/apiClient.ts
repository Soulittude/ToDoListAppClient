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
        // Optional: Add success logging here
        return response;
    },
    (error) => {
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

// Health check function
export const checkBackendHealth = async () => {
    try {
        const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${baseURL}/health`);
        console.log('Backend connection OK:', response.data);
        return true;
    } catch (error) {
        console.error('Backend connection failed:', error);
        return false;
    }
};

export default api;