import { useState } from 'react';
import { todoService } from '../../api/todoService';

interface TodoFormProps {
    onAdd: () => void; // Add this type definition
}

export const TodoForm = ({ onAdd }: TodoFormProps) => {
    const [text, setText] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        try {
            await todoService.createTodo({ text });
            setText('');
            onAdd(); // Trigger refresh after successful creation
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="todo-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add new todo"
            />
            <button type="submit" className="btn btn-primary">
                Add Todo
            </button>
        </form>
    );
};