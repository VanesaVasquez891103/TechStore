import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDto, LoginDto } from '../dtos/user.dto';

export class UserController {
    constructor(private service: UserService) {}

    register(req: Request, res: Response): Response {
        const dto: CreateUserDto = req.body;
        const user = this.service.register(dto);
        return res.status(201).json(user);
    }

    login(req: Request, res: Response): Response {
        const dto: LoginDto = req.body;
        const user = this.service.validateCredentials(dto);
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        return res.json(user);
    }

    getById(req: Request, res: Response): Response {
        const id = Number(req.params.id);
        const user = this.service.getById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.json(user);
    }
}
