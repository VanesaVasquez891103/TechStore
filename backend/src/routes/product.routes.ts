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
 *           example: "Teclado mecánico"
 *         price:
 *           type: number
 *           example: 79.99
 *         stock:
 *           type: integer
 *           example: 25
 *         categoryId:
 *           type: integer
 *           example: 2
 *         description:
 *           type: string
 *           example: "Teclado mecánico RGB con switches táctiles."
 *         image:
 *           type: string
 *           example: "https://example.com/images/keyboard.png"
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
 *           example: "Mouse gaming"
 *         price:
 *           type: number
 *           example: 49.99
 *         stock:
 *           type: integer
 *           example: 50
 *         categoryId:
 *           type: integer
 *           example: 1
 *         description:
 *           type: string
 *           example: "Mouse para juegos con sensor óptico."
 *         image:
 *           type: string
 *           example: "https://example.com/images/mouse.png"
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
 */
import { Router } from 'express';
import { validateBody } from '../middlewares/validation.middleware';
import { ProductController } from '../controller/product.controller';
import { ProductService } from '../services/product.service';

const router = Router();
const controller = new ProductController(new ProductService());

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Devuelve todos los productos almacenados en mock JSON y permite búsqueda por nombre o categoría.
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nombre o descripción.
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filtrar por categoría.
 *     responses:
 *       200:
 *         description: Lista de productos
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
 *     summary: Crear un nuevo producto
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
router.post('/', validateBody([
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
router.put('/:id', validateBody([
    { field: 'name', type: 'string', required: false },
    { field: 'price', type: 'number', required: false },
    { field: 'stock', type: 'number', required: false },
    { field: 'categoryId', type: 'number', required: false },
    { field: 'description', type: 'string', required: false },
    { field: 'image', type: 'string', required: false }
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
router.delete('/:id', controller.delete.bind(controller));

export default router;
