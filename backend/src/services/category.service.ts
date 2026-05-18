import { db } from '../database/database';
import { ICategory } from '../interfaces/category.interfaces';
import { CreateCategoryDto, UpdateCategoryDto, DeleteCategoryDto } from '../dtos/category.dto';

const getAllCategoriesStmt = db.prepare('SELECT id, name, type, description FROM categories');
const getCategoryByIdStmt = db.prepare('SELECT id, name, type, description FROM categories WHERE id = ?');
const getCategoryByNameStmt = db.prepare('SELECT id, name, type, description FROM categories WHERE name = ?');
const insertCategoryStmt = db.prepare('INSERT INTO categories (name, type, description) VALUES (?, ?, ?)');
const updateCategoryStmt = db.prepare('UPDATE categories SET name = ?, type = ?, description = ? WHERE id = ?');
const deleteCategoryStmt = db.prepare('DELETE FROM categories WHERE id = ?');

export class CategoryService {
    getAll(): ICategory[] {
        return getAllCategoriesStmt.all() as ICategory[];
    }

    getById(id: number): ICategory | null {
        return getCategoryByIdStmt.get(id) as ICategory | null;
    }

    create(dto: CreateCategoryDto): ICategory {
        const existing = getCategoryByNameStmt.get(dto.name) as ICategory | undefined;
        if (existing) {
            return existing;
        }
        const result = insertCategoryStmt.run(dto.name, dto.type ?? null, dto.description);
        return {
            id: Number(result.lastInsertRowid),
            name: dto.name,
            type: dto.type,
            description: dto.description
        };
    }

    update(dto: UpdateCategoryDto): ICategory | null {
        const existing = this.getById(dto.id);
        if (!existing) {
            return null;
        }
        const updatedCategory = {
            id: dto.id,
            name: dto.name ?? existing.name,
            type: dto.type ?? existing.type,
            description: dto.description ?? existing.description
        };
        updateCategoryStmt.run(updatedCategory.name, updatedCategory.type ?? null, updatedCategory.description ?? null, dto.id);
        return updatedCategory;
    }

    delete(dto: DeleteCategoryDto): boolean {
        const result = deleteCategoryStmt.run(dto.id);
        return result.changes > 0;
    }
}
