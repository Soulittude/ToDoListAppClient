import apiClient from './apiClient';

// Type definition for Todo objects
export interface Todo {
    _id: string;
    text: string;
    completed: boolean;
    user: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Creates a new todo item
 * @param text - The text content of the todo
 * @returns Promise containing the created Todo object
 */
export const createTodo = async (text: string): Promise<Todo> => {
    const response = await apiClient.post('/todos', { text });
    return response.data;
};

/**
 * Updates an existing todo
 * @param id - ID of the todo to update
 * @param data - Partial todo data to update
 * @returns Promise containing the updated Todo object
 */
export const updateTodo = async (
    id: string,
    data: Partial<Todo>): Promise<Todo> => {
    const response = await apiClient.put(`/todos/${id}`, data);
    return response.data;
};


/**
 * Deletes a todo item
 * @param id - ID of the todo to delete
 */
export const deleteTodo = async (id: string): Promise<void> => {
    await apiClient.delete(`/todos/${id}`);
};

/**
 * Fetches a todo by id
 * @param id - ID of the todo to get
 */
export const getTodo = async (id: string): Promise<void> => {
    const response = await apiClient.get(`/todos/${id}`);
    return response.data;
};

/**
 * Fetches all todos from the API
 * @returns Promise containing array of Todo objects
 */
export const getTodos = async (): Promise<Todo[]> => {
    const response = await apiClient.get('/todos');
    return response.data;
};