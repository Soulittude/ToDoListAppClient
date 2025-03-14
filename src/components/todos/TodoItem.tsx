import { Todo } from '../../types/todo';

interface TodoItemProps {
    todo: Todo;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

export const TodoItem = ({ todo, onDelete, onToggle }: TodoItemProps) => (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
        <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo._id)}
        />
        <span>{todo.text}</span>
        <button onClick={() => onDelete(todo._id)}>Delete</button>
    </div>
);