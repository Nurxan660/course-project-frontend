export interface UserListResponse {
    totalItems: number;
    users: User[];
}

export interface User {
    id: number;
    email: string;
    fullName: string;
    registerDate: string;
    role: string;
    isBlocked: boolean
}