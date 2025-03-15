import { TodoList } from '../components/todos/TodoList';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

export const HomePage = () => {
    const { user, logout } = useAuth();

    return (
        <div className="main-container">
            {/* Header Container */}
            <div className="header-container">
                <div className="header-content">
                    <h1 style={{ color: 'white', margin: 0 }}>Welcome, {user?.email}</h1>
                    <button className="btn logout-btn" onClick={logout}>
                        Logout
                    </button>
                    <div className="date-header">
                        {format(new Date(), 'EEEE, MMMM do')}
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="content-container">
                <TodoList />
            </div>
        </div>
    );
};