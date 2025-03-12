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
                if (token) {
                    const { data: userData } = await authService.getProfile();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Session validation failed:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            // First verify backend connection
            const isHealthy = await checkBackendHealth();
            if (!isHealthy) throw new Error('Backend service unavailable');

            // Proceed with login
            await authService.login(email, password); // Token is handled in service
            const { data: userData } = await authService.getProfile();
            setUser(userData);
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // Rethrow for form handling
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
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