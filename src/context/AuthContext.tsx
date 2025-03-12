import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { authService } from '../api/authService';
import { checkBackendHealth } from '../api/apiClient'; // Add this import

interface AuthContextType {
    user: any | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Add health check on initial load
        checkBackendHealth().then(isHealthy => {
            if (!isHealthy) {
                console.error('Backend is unavailable');
                // You could set an error state here
            }
        });

        const loadUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }

                // Verify token validity with backend
                const { data: userData } = await authService.getProfile();
                setUser(userData);
            } catch (error) {
                console.error('Invalid session:', error);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            // Clear previous state
            localStorage.removeItem('token');
            setUser(null);

            // Get fresh token
            const { token } = await authService.login(email, password);
            console.log('Stored token:', localStorage.getItem('token'));

            // Verify token exists before making any requests
            if (!token) throw new Error('Authentication failed');

            // Immediate profile fetch with new token
            const { data: userData } = await authService.getProfile();
            console.log('Profile data:', userData);
            setUser(userData);
        } catch (error) {
            localStorage.removeItem('token');
            console.error('Full login error:', error);
            throw error;
        }
    };

    const logout = () => {
        // Clear both token and user state
        localStorage.removeItem('token');
        setUser(null);
        // Force full reload to reset all application state
        window.location.href = '/login';
    };

    const register = async (email: string, password: string) => {
        try {
            await checkBackendHealth();
            await authService.register(email, password);

            // Auto-login after registration
            //await login(email, password);
            console.log('Registration successful - please login');

        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const value = { user, loading, login, logout, register };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);