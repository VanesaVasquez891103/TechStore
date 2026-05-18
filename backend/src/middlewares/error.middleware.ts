import { Request, Response, NextFunction } from 'express';

interface ErrorWithStatus extends Error {
    status?: number;
}

export function errorMiddleware(err: ErrorWithStatus, req: Request, res: Response, next: NextFunction): Response {
    console.error('[ERROR]', err.message, err.stack ?? '');
    return res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor',
        details: process.env.NODE_ENV === 'production' ? undefined : err.stack
    });
}
