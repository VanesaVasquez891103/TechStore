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
        try {
            const product = this.service.create(dto);
            return res.status(201).json(product);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'No se pudo crear el producto';
            return res.status(400).json({ message });
        }
    }

    update(req: Request, res: Response): Response {
        const id = Number(req.params.id);
        const dto: UpdateProductDto = { id, ...req.body };
        let product;
        try {
            product = this.service.update(dto);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'No se pudo actualizar el producto';
            return res.status(400).json({ message });
        }
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
