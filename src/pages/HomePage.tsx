import { AppBar, Toolbar, Typography, Button, Container, Paper } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { TodoList } from '../components/todos/TodoList';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

export const HomePage = () => {
    const { user, logout } = useAuth();

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <AppBar position="static" sx={{ borderRadius: 3, mb: 4 }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div">
                        Welcome, {user?.email}
                    </Typography>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <Typography variant="subtitle1">
                            {format(new Date(), 'EEEE, MMMM do')}
                        </Typography>
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<LogoutIcon />}
                            onClick={logout}
                            sx={{
                                borderColor: 'rgba(255,255,255,0.4)',
                                '&:hover': { borderColor: 'rgba(255,255,255,0.8)' }
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>

            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                <TodoList />
            </Paper>
        </Container>
    );
};