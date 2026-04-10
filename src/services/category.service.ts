import * as fs from 'fs';
import * as path from 'path';
import { ICategory } from '../interfaces/category.interfaces';
import { CreateCategoryDto, UpdateCategoryDto, DeleteCategoryDto } from '../dtos/category.dto';

const DATA_DIR = path.join(__dirname, '../../data');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');

/**
 * Servicio para manejar operaciones CRUD de categorías de manera idempotente.
 * Utiliza un archivo JSON como base de datos mock.
 */
export class CategoryService {
    private categories: ICategory[] = [];

    constructor() {
        this.loadCategories();
    }

    /**
     * Carga las categorías desde el archivo JSON.
     * @swagger
     * components:
     *   schemas:
     *     Category:
     *       type: object
     *       properties:
     *         id:
     *           type: integer
     *         name:
     *           type: string
     *         description:
     *           type: string
     */
    private ensureDataDirectoryExists(): void {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }
    }

    private loadCategories(): void {
        this.ensureDataDirectoryExists();
        if (!fs.existsSync(CATEGORIES_FILE)) {
            fs.writeFileSync(CATEGORIES_FILE, JSON.stringify([], null, 2));
        }
        const data = fs.readFileSync(CATEGORIES_FILE, 'utf-8');
        this.categories = JSON.parse(data);
    }

    /**
     * Guarda las categorías en el archivo JSON.
     */
    private saveCategories(): void {
        this.ensureDataDirectoryExists();
        fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(this.categories, null, 2));
    }

    /**
     * Obtiene todas las categorías.
     * @returns {ICategory[]} Lista de categorías.
     * @swagger
     * /categories:
     *   get:
     *     summary: Obtiene todas las categorías
     *     responses:
     *       200:
     *         description: Lista de categorías
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Category'
     */
    getAll(): ICategory[] {
        return this.categories;
    }

    /**
     * Obtiene una categoría por ID.
     * @param id ID de la categoría.
     * @returns {ICategory | null} La categoría o null si no existe.
     */
    getById(id: number): ICategory | null {
        return this.categories.find(cat => cat.id === id) || null;
    }

    /**
     * Crea una nueva categoría de manera idempotente.
     * Si ya existe una categoría con el mismo nombre, devuelve la existente.
     * @param dto Datos para crear la categoría.
     * @returns {ICategory} La categoría creada o existente.
     * @swagger
     * /categories:
     *   post:
     *     summary: Crea una nueva categoría
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               description:
     *                 type: string
     *     responses:
     *       201:
     *         description: Categoría creada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Category'
     */
    create(dto: CreateCategoryDto): ICategory {
        const existing = this.categories.find(cat => cat.name === dto.name);
        if (existing) {
            return existing; // Idempotente: devuelve la existente
        }
        const newId = this.categories.length > 0 ? Math.max(...this.categories.map(c => c.id)) + 1 : 1;
        const newCategory: ICategory = {
            id: newId,
            name: dto.name,
            description: dto.description
        };
        this.categories.push(newCategory);
        this.saveCategories();
        return newCategory;
    }

    /**
     * Actualiza una categoría de manera idempotente.
     * Si no existe, no hace nada.
     * @param dto Datos para actualizar.
     * @returns {ICategory | null} La categoría actualizada o null si no existe.
     */
    update(dto: UpdateCategoryDto): ICategory | null {
        const index = this.categories.findIndex(cat => cat.id === dto.id);
        if (index === -1) {
            return null; // Idempotente: no existe, no actualiza
        }
        const category = this.categories[index];
        if (dto.name !== undefined) category.name = dto.name;
        if (dto.description !== undefined) category.description = dto.description;
        this.saveCategories();
        return category;
    }

    /**
     * Elimina una categoría de manera idempotente.
     * Si no existe, no hace nada.
     * @param dto Datos para eliminar.
     * @returns {boolean} True si se eliminó, false si no existía.
     */
    delete(dto: DeleteCategoryDto): boolean {
        const index = this.categories.findIndex(cat => cat.id === dto.id);
        if (index === -1) {
            return false; // Idempotente: no existe, no elimina
        }
        this.categories.splice(index, 1);
        this.saveCategories();
        return true;
    }
}