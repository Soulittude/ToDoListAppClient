import { useEffect } from 'react';
import { getTodos } from '../api/todos.api';
import { ApiResponse } from '../types/api'; // Add this import
import { Todo } from '../types/todo';

const HomePage = () => {
    useEffect(() => {
        const testConnection = async () => {
            try {
                const response: ApiResponse<Todo[]> = await getTodos();

                if (response.success) {
                    console.log('Todos:', response.data); // Now access .data safely
                } else {
                    console.error('API Error:', response.error);
                }

            } catch (error) {
                console.error('Request Failed:', error);
            }
        };
        testConnection();
    }, []);

    return <div>Check browser console for API results</div>;
};

export default HomePage;