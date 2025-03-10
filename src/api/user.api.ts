import apiClient from './apiClient';

// Type definition for User objects
export interface User {
    _id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Registers a new user
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise containing authentication token
 */
export const register = async (
    email: string,
    password: string
): Promise<{ token: string; user: User }> => {
    const response = await apiClient.post('/users/register', { email, password });
    return response.data;
};

/**
 * Logs in an existing user
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise containing authentication token
 */
export const login = async (
    email: string,
    password: string
): Promise<{ token: string; user: User }> => {
    const response = await apiClient.post('/users/login', { email, password });
    return response.data;
};

/**
 * Gets current user's profile
 * @returns Promise containing user data
 */
export const getProfile = async (): Promise<User> => {
    const response = await apiClient.get('/users/me');
    return response.data;
};