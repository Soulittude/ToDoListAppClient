import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;  // Return valid JSX
    }

    if (!user) {
        return <Navigate to="/login" replace />;  // Return Navigate component
    }

    return <>{children}</>;  // Wrap in fragment to ensure valid JSX
};