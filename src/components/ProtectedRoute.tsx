import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
    const { user, initializeAuth, loading } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const checkAuth = async () => {
            await initializeAuth();
            if (isMounted && !user && !loading) {
                navigate('/login');
            }
        };

        checkAuth();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [user, loading, initializeAuth, navigate]);

    if (loading) return <div>Loading...</div>;
    if (!user) return null;

    return children;
}