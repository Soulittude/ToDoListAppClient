//import { useSortable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { TodoItem } from './TodoItem';
import { useSortable } from '@dnd-kit/sortable';
import { Todo } from '../../types/todo';

export const SortableItem = ({ id, todo, onDelete, onToggle }: {
    id: string;
    todo: Todo;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <TodoItem
                todo={todo}
                onDelete={onDelete}
                onToggle={onToggle}
                dragHandleProps={listeners}
            />
        </div>
    );
};