import { Todo } from '../../types/todo';
import {
    Box,
    Checkbox,
    IconButton,
    Typography,
    useTheme,
    Stack,
    Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { format } from 'date-fns';

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
        <Box
            sx={{
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
            }}
        >
            {/* Drag Handle */}
            <Box
                {...dragHandleProps}
                sx={{
                    cursor: 'grab',
                    color: theme.palette.action.active,
                    display: 'flex',
                    alignItems: 'center',
                    '&:active': { cursor: 'grabbing' }
                }}
            >
                <DragIndicatorIcon />
            </Box>

            {/* Checkbox */}
            <Checkbox
                checked={todo.completed}
                onChange={() => onToggle(todo._id)}
                color="primary"
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            />

            {/* Content Area */}
            <Box sx={{
                flexGrow: 1,
                minWidth: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 2 // Add gap between elements
            }}>
                {/* Text Content */}
                <Box sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    overflow: 'hidden'
                }}>
                    <Typography
                        variant="body1"
                        sx={{
                            // ... existing styles
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '100%' // Ensure text uses available space
                        }}
                    >
                        {todo.text}
                    </Typography>

                    {todo.dueDate && (
                        <Chip
                            size="small"
                            label={format(new Date(todo.dueDate), 'MMM dd, HH:mm')}
                            sx={{
                                borderRadius: 1,
                                bgcolor: 'action.selected',
                                fontSize: '0.75rem'
                            }}
                        />
                    )}
                </Box>

                <IconButton
                    onClick={() => onDelete(todo._id)}
                    size="small"
                    sx={{
                        color: 'text.secondary',
                        '&:hover': {
                            color: 'error.main',
                            bgcolor: 'error.light'
                        }
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    );
};