import axios from 'axios';

const API = axios.create({
    baseURL: '/api/todos',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getTodos = async () => {
    const { data } = await API.get('/');
    return data;
};

export const createTodo = async (text: string) => {
    const { data } = await API.post('/', { text });
    return data;
};