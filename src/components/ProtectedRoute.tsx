import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { user, initializeAuth, loading } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        initializeAuth().then(() => {
            if (!user && !loading) navigate('/login');
        });
    }, [user, loading]);

    if (loading || !user) return <div>Loading...</div>;

    return children;
}