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

const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    // Use window.location instead of navigate to prevent state issues
    window.location.href = '/login';
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        let isMounted = true;

        const loadUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }

                const { data: userData } = await authService.getProfile();
                if (isMounted) setUser(userData);
            } catch (error) {
                if (isMounted) console.error('Session validation failed:', error);
                localStorage.removeItem('token');
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadUser();
        return () => { isMounted = false };
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
        localStorage.removeItem('token');
        setUser(null);
        // Use navigate instead of window.location
        window.location.href = '/login'; // Full page reset to clear state
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

function setUser(arg0: null) {
    throw new Error('Function not implemented.');
}
