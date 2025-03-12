import api from './apiClient';

export const authService = {
    async register(email: string, password: string) {
        const response = await api.post('/users/register', { email, password });
        return response.data;
    },

    async login(email: string, password: string) {
        const response = await api.post('/users/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    logout() {
        localStorage.removeItem('token');
    },

    async getProfile() {
        const response = await api.get('/users/me');
        return response.data;
    }
};