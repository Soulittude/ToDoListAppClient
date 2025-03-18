import api from './apiClient';
import { Todo, TodoCreateDTO, TodoUpdateDTO } from '../types/todo';

export const todoService = {
    async getAllTodos(): Promise<Todo[]> {
        const response = await api.get('/todos');
        return response.data.data.sort((a: Todo, b: Todo) => a.order - b.order);
    },

    async getTodoById(id: string): Promise<Todo> {
        const response = await api.get(`/todos/${id}`);
        return response.data.data;
    },

    async createTodo(todoData: TodoCreateDTO): Promise<Todo> {
        const response = await api.post('/todos', todoData);
        return response.data.data;
    },

    async updateTodo(id: string, todoData: TodoUpdateDTO): Promise<Todo> {
        const response = await api.put(`/todos/${id}`, todoData);
        return response.data.data;
    },

    async deleteTodo(id: string): Promise<void> {
        await api.delete(`/todos/${id}`);
    },

    async updateTodoOrder(ids: string[]): Promise<void> {
        await api.patch('/todos/reorder', { ids });
    },

    async refreshTodos(): Promise<Todo[]> {
        return this.getAllTodos();
    },

    async createSpecificDateTodo(todoData: {
        text: string;
        specificDate: string;
        order: number
    }): Promise<Todo> {
        const response = await api.post('/todos/specific-date', todoData);
        return response.data.data;
    }
};