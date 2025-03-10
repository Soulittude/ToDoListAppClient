import { create } from 'zustand';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todos.api';
import { Todo } from '../types/todo';

interface TodoStore {
    todos: Todo[];
    loading: boolean;
    error: string | null;
    fetchTodos: () => Promise<void>;
    addTodo: (text: string) => Promise<void>;
    toggleTodo: (id: string) => Promise<void>;
    removeTodo: (id: string) => Promise<void>;
}

const useTodoStore = create<TodoStore>((set) => ({
    todos: [],
    loading: false,
    error: null,

    fetchTodos: async () => {
        set({ loading: true, error: null });
        try {
            const todos = await getTodos();
            set({ todos, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    addTodo: async (text) => {
        set({ loading: true });
        try {
            const newTodo = await createTodo(text);
            set((state) => ({ todos: [newTodo, ...state.todos], loading: false }));
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    toggleTodo: async (id) => {
        set({ loading: true });
        try {
            const updatedTodo = await updateTodo(id, { completed: true });
            set((state) => ({
                todos: state.todos.map(todo =>
                    todo._id === id ? updatedTodo : todo
                ),
                loading: false
            }));
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    },

    removeTodo: async (id) => {
        set({ loading: true });
        try {
            await deleteTodo(id);
            set((state) => ({
                todos: state.todos.filter(todo => todo._id !== id),
                loading: false
            }));
        } catch (error: any) {
            set({ error: error.message, loading: false });
        }
    }
}));

export default useTodoStore;