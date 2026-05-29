import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { CreateOrderDto, UpdateOrderDto, DeleteOrderDto } from '../dtos/order.dto';

export class OrderController {
    constructor(private service: OrderService) {}

    getAll(req: Request, res: Response): Response {
        const userId = req.query.userId ? Number(req.query.userId) : undefined;

        if (req.query.userId && Number.isNaN(userId)) {
            return res.status(400).json({ message: 'userId debe ser un número válido' });
        }

        return res.json(this.service.getAll(userId));
    }

    getById(req: Request, res: Response): Response {
        const id = Number(req.params.id);
        const order = this.service.getById(id);
        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        return res.json(order);
    }

    create(req: Request, res: Response): Response {
        const dto: CreateOrderDto = req.body;
        try {
            const order = this.service.create(dto);
            return res.status(201).json(order);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'No se pudo crear la orden';
            return res.status(400).json({ message });
        }
    }

    update(req: Request, res: Response): Response {
        const id = Number(req.params.id);
        const dto: UpdateOrderDto = { id, ...req.body };
        const order = this.service.update(dto);
        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        return res.json(order);
    }

    delete(req: Request, res: Response): Response {
        const id = Number(req.params.id);
        const success = this.service.delete({ id });
        if (!success) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        return res.status(204).send();
    }
}
