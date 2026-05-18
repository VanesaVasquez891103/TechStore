import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { CreateProductDto, UpdateProductDto, DeleteProductDto } from '../dtos/product.dto';

export class ProductController {
    constructor(private service: ProductService) {}

    getAll(req: Request, res: Response): Response {
        const search = typeof req.query.search === 'string' ? req.query.search : undefined;
        const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;

        if (req.query.categoryId && Number.isNaN(categoryId)) {
            return res.status(400).json({ message: 'categoryId debe ser un número válido' });
        }

        return res.json(this.service.getAll(search, categoryId));
    }

    getById(req: Request, res: Response): Response {
        const id = Number(req.params.id);
        const product = this.service.getById(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        return res.json(product);
    }

    create(req: Request, res: Response): Response {
        const dto: CreateProductDto = req.body;
        const product = this.service.create(dto);
        return res.status(201).json(product);
    }

    update(req: Request, res: Response): Response {
        const id = Number(req.params.id);
        const dto: UpdateProductDto = { id, ...req.body };
        const product = this.service.update(dto);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        return res.json(product);
    }

    delete(req: Request, res: Response): Response {
        const id = Number(req.params.id);
        const success = this.service.delete({ id });
        if (!success) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        return res.status(204).send();
    }
}
