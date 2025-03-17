import { AppBar, Toolbar, Typography, Button, Container, Paper } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { TodoList } from '../components/todos/TodoList';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

export const HomePage = () => {
    const { user, logout } = useAuth();

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <AppBar position="static" sx={{
                borderRadius: 3,
                mb: 4,
                background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)'
            }}>
                <Toolbar sx={{
                    justifyContent: 'space-between',
                    gap: 2,
                    flexWrap: 'wrap'
                }}>
                    <Typography variant="h6" sx={{ color: 'white' }}>
                        Welcome, {user?.email}
                    </Typography>

                    <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                        {format(new Date(), 'EEEE, MMMM do')}
                    </Typography>

                    <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<LogoutIcon sx={{ color: 'white' }} />}
                        onClick={logout}
                        sx={{
                            borderColor: 'rgba(255,255,255,0.3)',
                            backgroundColor: 'rgba(255,0,0,0.5)',
                            color: 'white',
                            '&:hover': {
                                borderColor: 'white',
                                backgroundColor: 'rgba(255,0,0,0.6)',
                            }
                        }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Paper elevation={3} sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: 'background.default', // Use light gray from theme
                border: '1px solid',
                borderColor: 'divider'
            }}>
                <TodoList />
            </Paper>
        </Container>
    );
};