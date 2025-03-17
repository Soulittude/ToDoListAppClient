import { CircularProgress } from '@mui/material';

export const LoadingSpinner = () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 32 }}>
        <CircularProgress size={40} />
    </div>
);