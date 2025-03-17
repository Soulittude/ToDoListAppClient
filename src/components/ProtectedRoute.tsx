import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress, Typography } from '@mui/material';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress size={60} />
                <Typography variant="h6" ml={2}>
                    Loading...
                </Typography>
            </Box>
        );
    }

    return user ? <>{children}</> : <Navigate to="/login" replace />;
};