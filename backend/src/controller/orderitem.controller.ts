import { Request, Response } from 'express';
import { OrderItemService } from '../services/orderitem.service';
import { CreateOrderItemDto, UpdateOrderItemDto, DeleteOrderItemDto } from '../dtos/orderitem.dto';

export class OrderItemController {
    constructor(private service: OrderItemService) {}

    getAll(req: Request, res: Response): Response {
        return res.json(this.service.getAll());
    }

    getById(req: Request, res: Response): Response {
        const id = Number(req.params.id);
        const item = this.service.getById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item de orden no encontrado' });
        }
        return res.json(item);
    }

    create(req: Request, res: Response): Response {
        const dto: CreateOrderItemDto = req.body;
        const item = this.service.create(dto);
        return res.status(201).json(item);
    }

    update(req: Request, res: Response): Response {
        const id = Number(req.params.id);
        const dto: UpdateOrderItemDto = { id, ...req.body };
        const item = this.service.update(dto);
        if (!item) {
            return res.status(404).json({ message: 'Item de orden no encontrado' });
        }
        return res.json(item);
    }

    delete(req: Request, res: Response): Response {
        const id = Number(req.params.id);
        const success = this.service.delete({ id });
        if (!success) {
            return res.status(404).json({ message: 'Item de orden no encontrado' });
        }
        return res.status(204).send();
    }
}
