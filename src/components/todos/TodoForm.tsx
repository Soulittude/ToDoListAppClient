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
    Box,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import { AddCircleOutline, Replay, CalendarToday, TextFields } from '@mui/icons-material';

interface TodoFormProps {
    onAdd: () => void;
    initialOrder: number;
}

export const TodoForm = ({ onAdd, initialOrder }: TodoFormProps) => {
    const [text, setText] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [recurrence, setRecurrence] = useState<'daily' | 'weekly'>('daily');
    const [todoType, setTodoType] = useState<'basic' | 'dated' | 'recurring'>('basic');

    const [typeError, setTypeError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setTypeError(false);

        // Validate type first
        if (!todoType) {
            setTypeError(true);
            alert('Please select a todo type');
            return;
        }

        try {
            const todoData: TodoCreateDTO = {
                text,
                order: initialOrder
            };

            // Explicitly handle each type
            switch (todoType) {
                case 'basic':
                    // Ensure no date/recurrence
                    delete todoData.date;
                    delete todoData.recurrence;
                    break;

                case 'dated':
                    if (!date) {
                        alert('Please select a date');
                        return;
                    }
                    todoData.date = date.toISOString();
                    delete todoData.recurrence;
                    break;

                case 'recurring':
                    if (!date) {
                        alert('Please select a start date');
                        return;
                    }
                    todoData.date = date.toISOString();
                    todoData.recurrence = recurrence;
                    break;
            }

            await todoService.createTodo(todoData);

            // Reset form
            setText('');
            setDate(null);
            setRecurrence('daily');
            onAdd();
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    };

    return (
        <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                        <ToggleButtonGroup
                            value={todoType}
                            exclusive
                            onChange={(_, newType) => {
                                if (newType) { // Prevent deselection
                                    setTodoType(newType);
                                    setTypeError(false);
                                }
                            }}
                            fullWidth
                            sx={{
                                '& .MuiToggleButton-root': {
                                    borderColor: theme => typeError ? theme.palette.error.main : 'inherit'
                                }
                            }}
                        >
                            <ToggleButton value="basic">
                                <TextFields sx={{ mr: 1 }} /> Basic
                            </ToggleButton>
                            <ToggleButton value="dated">
                                <CalendarToday sx={{ mr: 1 }} /> Dated
                            </ToggleButton>
                            <ToggleButton value="recurring">
                                <Replay sx={{ mr: 1 }} /> Recurring
                            </ToggleButton>
                        </ToggleButtonGroup>
                        {typeError && (
                            <Box sx={{ color: 'error.main', mt: 1 }} role="alert">
                                Please select a todo type
                            </Box>
                        )}
                    </Grid>

                    <Grid item xs={12} md={todoType === 'basic' ? 12 : 5}>
                        <TextField
                            fullWidth
                            label="Todo text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            variant="outlined"
                            size="small"
                            required
                        />
                    </Grid>

                    {(todoType === 'dated' || todoType === 'recurring') && (
                        <Grid item xs={6} md={4}>
                            <DatePicker
                                selected={date}
                                onChange={setDate}
                                placeholderText="Select date"
                                customInput={
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        label={todoType === 'recurring' ? 'Start date' : 'Date'}
                                        required
                                    />
                                }
                                dateFormat="MMMM d, yyyy"
                                minDate={new Date()}
                            />
                        </Grid>
                    )}

                    {todoType === 'recurring' && (
                        <Grid item xs={6} md={3}>
                            <TextField
                                fullWidth
                                select
                                label="Repeat"
                                value={recurrence}
                                onChange={(e) => setRecurrence(e.target.value as any)}
                                variant="outlined"
                                size="small"
                                required
                            >
                                <MenuItem value="daily">Daily</MenuItem>
                                <MenuItem value="weekly">Weekly</MenuItem>
                            </TextField>
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<AddCircleOutline />}
                            size="large"
                        >
                            Add Todo
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};