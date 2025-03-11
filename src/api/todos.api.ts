import apiClient from './apiClient';
import { Todo } from '../types/todo';
import { ApiResponse } from '../types/api';

export const getTodos = async (): Promise<ApiResponse<Todo[]>> => {
    const response = await apiClient.get('/todos');
    return response.data;
};

// Keep other endpoints empty for now
export const createTodo = async (text: string) => { };
export const updateTodo = async () => { };
export const deleteTodo = async () => { };