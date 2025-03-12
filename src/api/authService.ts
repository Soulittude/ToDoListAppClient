import api from './apiClient';

export const authService = {
    async register(email: string, password: string) {
        const response = await api.post('/users/register', { email, password });
        return response.data;
    },

    async login(email: string, password: string) {
        const response = await api.post('/users/login', { email, password });

        // Add debug log to see actual response structure
        console.log('Login response:', response.data);

        // Handle backend response structure properly
        if (!response.data?.data?.token) {
            throw new Error('No token received in response');
        }

        const token = response.data.data.token;
        localStorage.setItem('token', token);
        return { token };
    },

    logout() {
        localStorage.removeItem('token');
    },

    async getProfile() {
        const response = await api.get('/users/me');
        return response.data;
    }
};