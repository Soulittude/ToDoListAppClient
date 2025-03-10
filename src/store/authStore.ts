import { create } from 'zustand';
import { login, register, getProfile } from '../api/user.api';

interface AuthStore {
    user: { _id: string; email: string } | null;
    loading: boolean;
    error: string | null;
    initializeAuth: () => Promise<void>;
    handleRegister: (email: string, password: string) => Promise<void>;
    handleLogin: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    loading: false,
    error: null,

    initializeAuth: async () => {
        set({ loading: true });
        try {
            const user = await getProfile();
            set({ user, loading: false });
        } catch (error) {
            localStorage.removeItem('token');
            set({ user: null, loading: false });
        }
    },

    handleRegister: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const { token, user } = await register(email, password);
            localStorage.setItem('token', token);
            set({ user, loading: false });
        } catch (error: any) {
            set({ error: error.message || 'Registration failed', loading: false });
        }
    },

    handleLogin: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const { token, user } = await login(email, password);
            localStorage.setItem('token', token);
            set({ user, loading: false });
        } catch (error: any) {
            set({ error: error.message || 'Login failed', loading: false });
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null });
    }
}));

export default useAuthStore;