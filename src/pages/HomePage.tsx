import { TodoList } from '../components/todos/TodoList';
import { useAuth } from '../context/AuthContext';

export const HomePage = () => {
    const { user, logout } = useAuth();

    return (
        <div className="container">
            <header className="header">
                <div className="header-content">
                    <h1>Welcome, {user?.email}</h1>
                    <button className="logout-button" onClick={logout}>
                        Logout
                    </button>
                </div>
            </header>
            <TodoList />
        </div>
    );
};