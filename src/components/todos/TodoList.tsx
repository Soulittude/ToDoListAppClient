import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '../../types/todo';
import { TodoForm } from './TodoForm';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { todoService } from '../../api/todoService';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

export const TodoList = () => {
    const queryClient = useQueryClient();

    const { data: todos, isLoading, isError } = useQuery<Todo[]>({
        queryKey: ['todos'],
        queryFn: () => todoService.getAllTodos()
            .then(todos => todos.sort((a, b) => a.order - b.order))
    });

    const deleteMutation = useMutation({
        mutationFn: todoService.deleteTodo,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
    });

    const toggleMutation = useMutation({
        mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
            todoService.updateTodo(id, { completed }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
    });

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = todos?.findIndex(t => t._id === active.id) ?? -1;
        const newIndex = todos?.findIndex(t => t._id === over.id) ?? -1;

        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

        queryClient.setQueryData<Todo[]>(['todos'], (oldTodos = []) => {
            return arrayMove(oldTodos, oldIndex, newIndex)
                .map((todo, index) => ({ ...todo, order: index }));
        });

        // Send the full ordered list to backend
        todoService.updateTodoOrder(
            todos!.map(t => t._id)
        ).catch(() => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        });
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error loading todos</div>;

    const maxOrder = todos ? Math.max(...todos.map(t => t.order)) + 1 : 0;

    return (
        <div className="todo-list">
            <TodoForm
                onAdd={() => queryClient.invalidateQueries({ queryKey: ['todos'] })}
                initialOrder={maxOrder}  // Pass current max order
            />
            <DndContext onDragEnd={handleDragEnd}>
                <SortableContext
                    items={todos?.map(t => t._id) || []}
                    strategy={verticalListSortingStrategy}
                >
                    {todos?.map((todo) => (
                        <SortableItem
                            key={todo._id}
                            id={todo._id}
                            todo={todo}
                            onDelete={(id) => deleteMutation.mutate(id)}
                            onToggle={(id) => toggleMutation.mutate({
                                id,
                                completed: !todo.completed
                            })}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
};