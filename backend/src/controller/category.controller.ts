import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto, UpdateCategoryDto, DeleteCategoryDto } from '../dtos/category.dto';

export class CategoryController {
    constructor(private service: CategoryService) {}

    getAll(req: Request, res: Response): Response {
        return res.json(this.service.getAll());
    }

    getById(req: Request, res: Response): Response {
        const id = Number(req.params.id);
        const category = this.service.getById(id);
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        return res.json(category);
    }

    create(req: Request, res: Response): Response {
        const dto: CreateCategoryDto = req.body;
        const category = this.service.create(dto);
        return res.status(201).json(category);
    }

    update(req: Request, res: Response): Response {
        const id = Number(req.params.id);
        const dto: UpdateCategoryDto = { id, ...req.body };
        const category = this.service.update(dto);
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        return res.json(category);
    }

    delete(req: Request, res: Response): Response {
        const id = Number(req.params.id);
        const success = this.service.delete({ id });
        if (!success) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        return res.status(204).send();
    }
}
