export interface User {
    id: string,
    username: string,
    email?: string,
    about?: string
}

export interface Chat {
    id: string;
    created_at: Date;
    users?: User[];
}

export interface UserResponse {
    users: User[]
}