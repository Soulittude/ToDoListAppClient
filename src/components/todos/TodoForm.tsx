import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { TodoCreateDTO } from '../../types/todo';
import { todoService } from '../../api/todoService';
import 'react-datepicker/dist/react-datepicker.css';

interface TodoFormProps {
    onAdd: () => void;
    initialOrder: number;  // Add new prop
}

export const TodoForm = ({ onAdd, initialOrder }: TodoFormProps) => {
    const [text, setText] = useState('');
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [recurrence, setRecurrence] = useState<'none' | 'daily' | 'weekly'>('none');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        try {
            const todoData: TodoCreateDTO = {
                text,
                dueDate: dueDate?.toISOString(),
                recurrence: recurrence !== 'none' ? recurrence : undefined,
                order: initialOrder,  // Use initialOrder from props
            };

            await todoService.createTodo(todoData);
            setText('');
            setDueDate(null);
            setRecurrence('none');
            onAdd();
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <div className="form-grid">
                <input
                    type="text"
                    className="todo-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add new todo"
                    required
                />

                <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    placeholderText="Select due date"
                    className="date-picker"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    showTimeInput
                    minDate={new Date()}
                />

                <select
                    value={recurrence}
                    onChange={(e) => setRecurrence(e.target.value as any)}
                    className="recurrence-select"
                >
                    <option value="none">No recurrence</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                </select>

                <button type="submit" className="btn btn-primary">
                    Add Todo
                </button>
            </div>
        </form>
    );
};