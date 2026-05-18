/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Electrónica"
 *         description:
 *           type: string
 *           example: "Productos electrónicos y accesorios"
 *       required:
 *         - id
 *         - name
 *         - description
 *     CreateCategoryDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Ropa"
 *         description:
 *           type: string
 *           example: "Categoría para vestimenta"
 *       required:
 *         - name
 *         - description
 *     UpdateCategoryDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *     DeleteCategoryDto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 */
import { Router } from 'express';
import { validateBody } from '../middlewares/validation.middleware';
import { CategoryController } from '../controller/category.controller';
import { CategoryService } from '../services/category.service';

const router = Router();
const controller = new CategoryController(new CategoryService());

/**
 * @openapi
 * /api/categories:
 *   get:
 *     summary: Obtener todas las categorías
 *     description: Devuelve la lista completa de categorías almacenadas en mock JSON.
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
router.get('/', controller.getAll.bind(controller));

/**
 * @openapi
 * /api/categories/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoría no encontrada
 */
router.get('/:id', controller.getById.bind(controller));

/**
 * @openapi
 * /api/categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     description: Crea una categoría nueva si no existe otra con el mismo nombre.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryDto'
 *     responses:
 *       201:
 *         description: Categoría creada o existente retornada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */
router.post('/', validateBody([
    { field: 'name', type: 'string' },
    { field: 'description', type: 'string' }
]), controller.create.bind(controller));

/**
 * @openapi
 * /api/categories/{id}:
 *   put:
 *     summary: Actualizar una categoría existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategoryDto'
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoría no encontrada
 */
router.put('/:id', validateBody([
    { field: 'name', type: 'string', required: false },
    { field: 'description', type: 'string', required: false }
]), controller.update.bind(controller));

/**
 * @openapi
 * /api/categories/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría a eliminar
 *     responses:
 *       204:
 *         description: Categoría eliminada
 *       404:
 *         description: Categoría no encontrada
 */
router.delete('/:id', controller.delete.bind(controller));

export default router;
