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
            default: '#f1f5f9', // Darker gray
            paper: '#ffffff',
        },
        divider: '#cbd5e1' // Darker border
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
                    border: '2px solid', // Thicker border
                    borderColor: 'divider',
                },
            },
        },
    },
});