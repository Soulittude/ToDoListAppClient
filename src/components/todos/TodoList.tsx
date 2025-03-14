import { useEffect, useState } from 'react';
import { todoService } from '../../api/todoService';
import { Todo } from '../../types/todo';
import { TodoForm } from './TodoForm';
import { TodoItem } from './TodoItem'; // Add this import

export const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadTodos = async () => {
        setLoading(true);
        try {
            const data = await todoService.refreshTodos();
            setTodos(data);
        } catch (error) {
            console.error('Error loading todos:', error);
        } finally {
            setLoading(false);
        }
    };

    // Add to useEffect
    useEffect(() => {
        loadTodos();
    }, []);

    if (loading) return <div>Loading todos...</div>;

    const handleDelete = async (id: string) => {
        try {
            await todoService.deleteTodo(id);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleToggle = async (id: string) => {
        try {
            const todo = todos.find(t => t._id === id);
            if (!todo) return;

            const updated = await todoService.updateTodo(id, {
                completed: !todo.completed
            });
            setTodos(todos.map(t => t._id === id ? updated : t));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <div className="todo-list">
            <TodoForm onAdd={loadTodos} />
            {todos.map((todo) => (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    onDelete={handleDelete}
                    onToggle={handleToggle}
                />
            ))}
        </div>
    );
};