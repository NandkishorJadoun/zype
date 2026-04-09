export interface User {
    id: string,
    username: string,
    email?: string,
    about?: string
}

export interface UserResponse {
    users: User[]
}