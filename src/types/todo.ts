export interface Todo {
    _id: string;
    text: string;
    completed: boolean;
    user: string;
    createdAt: string;
    updatedAt: string;
}

export interface TodoCreateDTO {
    text: string;
    completed?: boolean;
}

export interface TodoUpdateDTO {
    text?: string;
    completed?: boolean;
}