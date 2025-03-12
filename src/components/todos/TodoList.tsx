import { useEffect, useState } from 'react';
import { todoService } from '../../api/todoService';
import { Todo } from '../../types/todo';

export const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const data = await todoService.getAllTodos();
                setTodos(data);
                setError('');
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load todos');
                console.error('Todo fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        loadTodos();
    }, []);

    if (loading) return <div>Loading todos...</div>;

    return (
        <div>
            {error && <div className="error">{error}</div>}

            {todos.length === 0 ? (
                <div>No todos found. Create your first todo!</div>
            ) : (
                todos.map((todo) => (
                    <div key={todo._id}>
                        <h3>{todo.text}</h3>
                        <p>{todo.completed ? '✅ Completed' : '⏳ Pending'}</p>
                    </div>
                ))
            )}
        </div>
    );
};