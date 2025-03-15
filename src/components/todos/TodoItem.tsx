import { Todo } from '../../types/todo';
import { CSSProperties } from 'react';

interface TodoItemProps {
    todo: Todo;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
    dragHandleProps?: any;
}

export const TodoItem = ({
    todo,
    onDelete,
    onToggle,
    dragHandleProps
}: TodoItemProps) => (
    <div className="todo-item">
        <div className="drag-handle" {...dragHandleProps}>
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M4 6H12M4 10H12" stroke="#64748B" strokeWidth="1.5" />
            </svg>
        </div>
        <div className="todo-content">
            <div
                className={`custom-checkbox ${todo.completed ? 'checked' : ''}`}
                onClick={() => onToggle(todo._id)}
            >
                <span className="check-icon">✓</span>
            </div>
            <span className="todo-text">{todo.text}</span>
        </div>
        <button
            className="btn btn-danger"
            onClick={() => onDelete(todo._id)}
        >
            Delete
        </button>
    </div>
);