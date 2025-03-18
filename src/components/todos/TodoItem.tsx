import { Todo } from '../../types/todo';
import {
    Box,
    Checkbox,
    IconButton,
    Typography,
    useTheme,
    Chip,
    Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { format } from 'date-fns';
import ReplayIcon from '@mui/icons-material/Replay';
import EventIcon from '@mui/icons-material/Event';

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
}: TodoItemProps) => {
    const theme = useTheme();

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: 1.5,
            mb: 1,
            bgcolor: 'background.paper',
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[1],
            transition: 'all 0.2s',
            '&:hover': {
                boxShadow: theme.shadows[3],
                transform: 'translateY(-1px)'
            }
        }}>
            <Box {...dragHandleProps} sx={{ cursor: 'grab', display: 'flex', alignItems: 'center' }}>
                <DragIndicatorIcon color="action" />
            </Box>

            <Checkbox
                checked={todo.completed}
                onChange={() => onToggle(todo._id)}
                color="primary"
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            />

            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 500,
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            color: todo.completed ? 'text.secondary' : 'text.primary',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        {todo.text}
                    </Typography>

                    {todo.recurrence && (
                        <Chip
                            icon={<ReplayIcon fontSize="small" />}
                            label={todo.recurrence}
                            size="small"
                            sx={{ bgcolor: 'primary.100', color: 'primary.dark' }}
                        />
                    )}

                    {(todo.date && !todo.recurrence) && (
                        <Chip
                            icon={<EventIcon fontSize="small" />}
                            label={format(new Date(todo.date), 'MMM dd')}
                            size="small"
                            sx={{ bgcolor: 'grey.100', color: 'grey.600' }}
                        />
                    )}
                </Stack>

                {todo.isRecurringInstance && (
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                        <ReplayIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                        Auto-generated instance
                    </Typography>
                )}
            </Box>

            <IconButton
                onClick={() => onDelete(todo._id)}
                size="small"
                sx={{
                    color: 'text.secondary',
                    '&:hover': { color: 'error.main', bgcolor: 'error.light' }
                }}
            >
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};