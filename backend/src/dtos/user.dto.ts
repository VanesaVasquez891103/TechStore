export interface CreateUserDto {
    name: string;
    lastName?: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    role?: 'customer' | 'admin';
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface UpdateUserDto {
    id: number;
    name?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    address?: string;
}

export interface DeleteUserDto {
    id: number;
}