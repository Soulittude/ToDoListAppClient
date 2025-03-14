import { Todo } from '../../types/todo';

interface TodoItemProps {
    todo: Todo;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

export const TodoItem = ({ todo, onDelete, onToggle }: TodoItemProps) => (
    <div className="todo-item">
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