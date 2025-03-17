import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { TodoCreateDTO } from '../../types/todo';
import { todoService } from '../../api/todoService';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Grid,
    TextField,
    MenuItem,
    Button,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

interface TodoFormProps {
    onAdd: () => void;
    initialOrder: number;
}

export const TodoForm = ({ onAdd, initialOrder }: TodoFormProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
                order: initialOrder,
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
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
                <Grid item xs={12} sm={5}>
                    <TextField
                        fullWidth
                        label="New Todo"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        variant="outlined"
                        size="small"
                    />
                </Grid>

                <Grid item xs={6} sm={3}>
                    <DatePicker
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        placeholderText="Due Date"
                        customInput={
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                label="Due Date"
                            />
                        }
                        showTimeInput
                        minDate={new Date()}
                    />
                </Grid>

                <Grid item xs={6} sm={2}>
                    <TextField
                        fullWidth
                        select
                        label="Recurrence"
                        value={recurrence}
                        onChange={(e) => setRecurrence(e.target.value as any)}
                        variant="outlined"
                        size="small"
                    >
                        <MenuItem value="none">None</MenuItem>
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={2}>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleOutline />}
                        size={isMobile ? "small" : "medium"}
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};