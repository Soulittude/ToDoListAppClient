import { TodoList } from '../components/todos/TodoList';
import { useAuth } from '../context/AuthContext';

export const HomePage = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading user...</div>;

    return (
        <div>
            <header>
                <h1>Welcome, {user?.email}</h1>
                {/* ... */}
            </header>
            {/* ... */}
        </div>
    );
};