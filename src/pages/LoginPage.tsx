import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { logout } = useAuth();

    useEffect(() => {
        // Clear any existing token when visiting login page
        logout();
    }, [logout]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Clear previous session
            localStorage.removeItem('token');

            // Initiate login
            console.log('Starting login process...');
            await login(email, password);
            console.log('Login successful, redirecting...');
        } catch (err) {
            console.error('Login error:', err);
            setError(err instanceof Error ? err.message : 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            {error && <div className="error">{error}</div>}
            <button type="submit">Login</button>
        </form>
    );
};