export interface IUser {
    id: number;
    name: string;
    lastName?: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    role: 'customer' | 'admin';
}