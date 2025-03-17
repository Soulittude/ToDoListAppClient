import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#4f46e5',
        },
        secondary: {
            main: '#ef4444',
        },
        background: {
            default: '#f8fafc', // Light gray background
            paper: '#ffffff',   // White components
        },
        divider: '#e2e8f0' // Border color
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    border: '1px solid',
                    borderColor: '#e2e8f0',
                },
            },
        },
    },
});