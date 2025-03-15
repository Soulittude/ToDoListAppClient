export interface TodoCreateDTO {
    text: string;
    dueDate?: string;
    recurrence?: 'daily' | 'weekly';
    order?: number;  // Add order to DTO
}

export interface TodoUpdateDTO {
    text?: string;
    completed?: boolean;
    order?: number;  // Add order to update DTO
}

export interface Todo extends TodoCreateDTO {
    _id: string;
    completed: boolean;
    user: string;
    createdAt: string;
    updatedAt: string;
    order: number;  // Make order required in main interface
}