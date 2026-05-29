/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Montura Aurora Carey"
 *         price:
 *           type: number
 *           example: 129000
 *         stock:
 *           type: integer
 *           example: 18
 *         categoryId:
 *           type: integer
 *           example: 1
 *         description:
 *           type: string
 *           example: "Montura redonda en acetato carey, ligera y comoda para lentes formulados de uso diario."
 *         image:
 *           type: string
 *           example: "/assets/optica/montura-aurora.png"
 *         brand:
 *           type: string
 *           example: "Optica Clara"
 *       required:
 *         - id
 *         - name
 *         - price
 *         - stock
 *         - categoryId
 *         - description
 *         - image
 *     CreateProductDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Gafas de Sol Costa UV400"
 *         price:
 *           type: number
 *           example: 159000
 *         stock:
 *           type: integer
 *           example: 15
 *         categoryId:
 *           type: integer
 *           example: 2
 *         description:
 *           type: string
 *           example: "Lentes polarizados con filtro UV400, ideales para manejo y actividades al aire libre."
 *         image:
 *           type: string
 *           example: "/assets/optica/sol-costa.png"
 *         brand:
 *           type: string
 *           example: "Optica Clara"
 *       required:
 *         - name
 *         - price
 *         - stock
 *         - categoryId
 *         - description
 *         - image
 *     UpdateProductDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         stock:
 *           type: integer
 *         categoryId:
 *           type: integer
 *         description:
 *           type: string
 *         image:
 *           type: string
 *         brand:
 *           type: string
 */
import { Router } from 'express';
import { validateBody } from '../middlewares/validation.middleware';
import { requireAdmin } from '../middlewares/admin.middleware';
import { ProductController } from '../controller/product.controller';
import { ProductService } from '../services/product.service';

const router = Router();
const controller = new ProductController(new ProductService());

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Devuelve productos de optica y permite busqueda por nombre, descripcion o categoria.
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nombre o descripcion.
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filtrar por categoria.
 *     responses:
 *       200:
 *         description: Lista de productos opticos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', controller.getAll.bind(controller));

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', controller.getById.bind(controller));

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto optico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductDto'
 *     responses:
 *       201:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post('/', requireAdmin, validateBody([
    { field: 'name', type: 'string' },
    { field: 'price', type: 'number' },
    { field: 'stock', type: 'number' },
    { field: 'categoryId', type: 'number' },
    { field: 'description', type: 'string' },
    { field: 'image', type: 'string' }
]), controller.create.bind(controller));

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductDto'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */
router.put('/:id', requireAdmin, validateBody([
    { field: 'name', type: 'string', required: false },
    { field: 'price', type: 'number', required: false },
    { field: 'stock', type: 'number', required: false },
    { field: 'categoryId', type: 'number', required: false },
    { field: 'description', type: 'string', required: false },
    { field: 'image', type: 'string', required: false },
    { field: 'brand', type: 'string', required: false }
]), controller.update.bind(controller));

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       204:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/:id', requireAdmin, controller.delete.bind(controller));

export default router;
