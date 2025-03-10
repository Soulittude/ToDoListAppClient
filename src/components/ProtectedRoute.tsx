import React, { useEffect } from 'react'; // Add React import
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
    const { user, initializeAuth, loading } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        initializeAuth().then(() => {
            if (!user && !loading) navigate('/login');
        });
        // Add all dependencies here
    }, [user, loading, initializeAuth, navigate]);

    if (loading || !user) return <div>Loading...</div>;

    return children;
}