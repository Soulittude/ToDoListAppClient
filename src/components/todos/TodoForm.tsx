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
    Box
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

interface TodoFormProps {
    onAdd: () => void;
    initialOrder: number;
}

export const TodoForm = ({ onAdd, initialOrder }: TodoFormProps) => {
    const theme = useTheme();
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
        <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={5}>
                        <TextField
                            fullWidth
                            label="New Todo"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={6} md={3}>
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

                    <Grid item xs={6} md={2}>
                        <TextField
                            fullWidth
                            select
                            label="Repeat"
                            value={recurrence}
                            onChange={(e) => setRecurrence(e.target.value as any)}
                            variant="outlined"
                            size="small"
                        >
                            <MenuItem value="none">Never</MenuItem>
                            <MenuItem value="daily">Daily</MenuItem>
                            <MenuItem value="weekly">Weekly</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<AddCircleOutline />}
                            size="medium"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};