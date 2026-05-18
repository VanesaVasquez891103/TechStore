import { Request, Response } from 'express';

export function notFoundMiddleware(req: Request, res: Response): Response {
    return res.status(404).json({
        error: 'Recurso no encontrado',
        message: 'La ruta solicitada no existe en el servidor'
    });
}
