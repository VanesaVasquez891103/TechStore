import { NextFunction, Request, Response } from 'express';
import { db } from '../database/database';
import { IUser } from '../interfaces/user.interfaces';

const getUserRoleStmt = db.prepare('SELECT id, role FROM users WHERE id = ?');

export function requireAdmin(req: Request, res: Response, next: NextFunction): Response | void {
    const userId = Number(req.header('x-user-id'));

    if (!userId || Number.isNaN(userId)) {
        return res.status(401).json({ message: 'Debes iniciar sesion como administrador.' });
    }

    const user = getUserRoleStmt.get(userId) as Pick<IUser, 'id' | 'role'> | undefined;
    if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Esta cuenta no tiene permisos de administrador.' });
    }

    return next();
}
