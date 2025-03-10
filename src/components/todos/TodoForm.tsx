import React, { useState } from 'react';
import useTodoStore from '../../store/todoStore';

// Your component code here
const TodoForm = () => {
    const [text, setText] = useState('');
    const { addTodo } = useTodoStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            addTodo(text);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add new todo..."
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

// Add this export statement ▼
export default TodoForm;