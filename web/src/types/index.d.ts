export interface User {
    id: string,
    email: string,
    username: string,
    about?: string,
    avatar?: string
}

export interface Message {
    id: string;
    chatId: string;
    created_at: Date;
    data: string;
    userId: string;
}

export interface Chat {
    id: string;
    created_at: Date;
    users: User[];
    messages: Message[]
}

export interface UserResponse {
    users: User[]
}

export interface FormValidationError {
    fieldName: string;
    message: string;
}