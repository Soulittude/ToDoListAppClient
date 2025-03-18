export interface TodoCreateDTO {
    text: string;
    date?: string;
    recurrence?: 'daily' | 'weekly'; // Remove 'none'
    order?: number;
}

export interface TodoUpdateDTO {
    text?: string;
    completed?: boolean;
    order?: number;
}

export interface Todo extends TodoCreateDTO {
    _id: string;
    completed: boolean;
    user: string;
    createdAt: string;
    updatedAt: string;
    order: number;
    originalTodo?: string;
    isRecurringInstance?: boolean;
    nextRecurrence?: string;
}