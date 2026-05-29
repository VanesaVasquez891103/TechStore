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
 *           example: "Monturas oftalmicas"
 *         description:
 *           type: string
 *           example: "Armazones para lentes formulados de uso diario, oficina y estudio."
 *       required:
 *         - id
 *         - name
 *         - description
 *     CreateCategoryDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Lentes de sol"
 *         description:
 *           type: string
 *           example: "Gafas con proteccion UV, opciones polarizadas y estilos para exterior."
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
 *     summary: Obtener todas las categorias
 *     description: Devuelve la lista completa de categorias opticas.
 *     responses:
 *       200:
 *         description: Lista de categorias
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
 *     summary: Obtener una categoria por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoria
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria no encontrada
 */
router.get('/:id', controller.getById.bind(controller));

/**
 * @openapi
 * /api/categories:
 *   post:
 *     summary: Crear una nueva categoria
 *     description: Crea una categoria nueva si no existe otra con el mismo nombre.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryDto'
 *     responses:
 *       201:
 *         description: Categoria creada o existente retornada
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
 *     summary: Actualizar una categoria existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoria a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategoryDto'
 *     responses:
 *       200:
 *         description: Categoria actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria no encontrada
 */
router.put('/:id', validateBody([
    { field: 'name', type: 'string', required: false },
    { field: 'description', type: 'string', required: false }
]), controller.update.bind(controller));

/**
 * @openapi
 * /api/categories/{id}:
 *   delete:
 *     summary: Eliminar una categoria
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoria a eliminar
 *     responses:
 *       204:
 *         description: Categoria eliminada
 *       404:
 *         description: Categoria no encontrada
 */
router.delete('/:id', controller.delete.bind(controller));

export default router;
