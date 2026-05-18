import { createHash } from 'crypto';
import { db } from '../database/database';
import { IUser } from '../interfaces/user.interfaces';
import { CreateUserDto, LoginDto } from '../dtos/user.dto';

const getAllUsersStmt = db.prepare('SELECT id, name, lastName, email, phone, address, role FROM users');
const getUserByIdStmt = db.prepare('SELECT id, name, lastName, email, phone, address, role FROM users WHERE id = ?');
const getUserByEmailStmt = db.prepare('SELECT id, name, lastName, email, password, phone, address, role FROM users WHERE LOWER(email) = LOWER(?)');
const insertUserStmt = db.prepare('INSERT INTO users (name, lastName, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, ?, ?)');

export class UserService {
    private hashPassword(password: string): string {
        return createHash('sha256').update(password).digest('hex');
    }

    private sanitize(user: IUser) {
        const { password, ...safeUser } = user;
        return safeUser;
    }

    getAll(): Omit<IUser, 'password'>[] {
        return getAllUsersStmt.all() as Omit<IUser, 'password'>[];
    }

    getById(id: number): Omit<IUser, 'password'> | null {
        const user = getUserByIdStmt.get(id) as IUser | null;
        return user ? this.sanitize(user) : null;
    }

    findByEmail(email: string): IUser | null {
        return getUserByEmailStmt.get(email) as IUser | null;
    }

    register(dto: CreateUserDto): Omit<IUser, 'password'> {
        const existing = this.findByEmail(dto.email);
        if (existing) {
            return this.sanitize(existing);
        }
        const hashedPassword = this.hashPassword(dto.password);
        const result = insertUserStmt.run(
            dto.name,
            dto.lastName ?? null,
            dto.email.toLowerCase(),
            hashedPassword,
            dto.phone ?? null,
            dto.address ?? null,
            dto.role === 'admin' ? 'admin' : 'customer'
        );
        return {
            id: Number(result.lastInsertRowid),
            name: dto.name,
            lastName: dto.lastName,
            email: dto.email.toLowerCase(),
            phone: dto.phone,
            address: dto.address,
            role: dto.role === 'admin' ? 'admin' : 'customer'
        };
    }

    validateCredentials(dto: LoginDto): Omit<IUser, 'password'> | null {
        const hashedPassword = this.hashPassword(dto.password);
        const user = getUserByEmailStmt.get(dto.email) as IUser | null;
        if (!user || user.password !== hashedPassword) {
            return null;
        }
        return this.sanitize(user);
    }
}
