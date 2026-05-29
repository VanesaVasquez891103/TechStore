import { db } from '../database/database';
import { IProduct } from '../interfaces/product.interfaces';
import { CreateProductDto, UpdateProductDto, DeleteProductDto } from '../dtos/product.dto';

const getAllProductsBase = 'SELECT id, name, price, stock, categoryId, description, image, brand FROM products';
const getProductByIdStmt = db.prepare('SELECT id, name, price, stock, categoryId, description, image, brand FROM products WHERE id = ?');
const getExistingProductStmt = db.prepare('SELECT id, name, price, stock, categoryId, description, image, brand FROM products WHERE name = ? AND categoryId = ?');
const insertProductStmt = db.prepare('INSERT INTO products (name, price, stock, categoryId, description, image, brand) VALUES (?, ?, ?, ?, ?, ?, ?)');

export class ProductService {
    getAll(search?: string, categoryId?: number): IProduct[] {
        const conditions: string[] = [];
        const params: any[] = [];

        if (search) {
            conditions.push('(LOWER(name) LIKE ? OR LOWER(description) LIKE ?)');
            params.push(`%${search.toLowerCase()}%`, `%${search.toLowerCase()}%`);
        }

        if (categoryId !== undefined) {
            conditions.push('categoryId = ?');
            params.push(categoryId);
        }

        const sql = conditions.length > 0 ? `${getAllProductsBase} WHERE ${conditions.join(' AND ')}` : getAllProductsBase;
        return db.prepare(sql).all(...params) as IProduct[];
    }

    getById(id: number): IProduct | null {
        return getProductByIdStmt.get(id) as IProduct | null;
    }

    create(dto: CreateProductDto): IProduct {
        if (dto.price <= 0) {
            throw new Error('El precio debe ser mayor que cero');
        }
        if (!Number.isInteger(dto.stock) || dto.stock < 0) {
            throw new Error('El stock debe ser un numero entero positivo.');
        }

        const existing = getExistingProductStmt.get(dto.name, dto.categoryId) as IProduct | undefined;
        if (existing) {
            return existing;
        }
        const result = insertProductStmt.run(dto.name, dto.price, dto.stock, dto.categoryId, dto.description, dto.image, dto.brand ?? null);
        return {
            id: Number(result.lastInsertRowid),
            name: dto.name,
            price: dto.price,
            stock: dto.stock,
            categoryId: dto.categoryId,
            description: dto.description,
            image: dto.image,
            brand: dto.brand
        };
    }

    update(dto: UpdateProductDto): IProduct | null {
        const existing = this.getById(dto.id);
        if (!existing) {
            return null;
        }
        if (dto.price !== undefined && dto.price <= 0) {
            throw new Error('El precio debe ser mayor que cero');
        }
        if (dto.stock !== undefined && (!Number.isInteger(dto.stock) || dto.stock < 0)) {
            throw new Error('El stock debe ser un numero entero positivo.');
        }

        const updatedProduct = {
            id: dto.id,
            name: dto.name ?? existing.name,
            price: dto.price ?? existing.price,
            stock: dto.stock ?? existing.stock,
            categoryId: dto.categoryId ?? existing.categoryId,
            description: dto.description ?? existing.description,
            image: dto.image ?? existing.image,
            brand: dto.brand ?? existing.brand
        };
        db.prepare(
            'UPDATE products SET name = ?, price = ?, stock = ?, categoryId = ?, description = ?, image = ?, brand = ? WHERE id = ?'
        ).run(
            updatedProduct.name,
            updatedProduct.price,
            updatedProduct.stock,
            updatedProduct.categoryId,
            updatedProduct.description,
            updatedProduct.image,
            updatedProduct.brand ?? null,
            dto.id
        );
        return updatedProduct;
    }

    delete(dto: DeleteProductDto): boolean {
        const result = db.prepare('DELETE FROM products WHERE id = ?').run(dto.id);
        return result.changes > 0;
    }
}
