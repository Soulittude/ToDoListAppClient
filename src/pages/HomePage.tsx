import { TodoList } from '../components/todos/TodoList';
import { useAuth } from '../context/AuthContext';

export const HomePage = () => {
    const { user, loading, logout } = useAuth();

    if (loading) return <div>Checking session...</div>;

    return (
        <div>
            <h1>Welcome, {user?.email}</h1>
            <button onClick={logout}>Logout</button>
            <TodoList />
        </div>
    );
};