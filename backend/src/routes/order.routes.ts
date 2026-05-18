/**
 * @openapi
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         productId:
 *           type: integer
 *           example: 1
 *         quantity:
 *           type: integer
 *           example: 2
 *         price:
 *           type: number
 *           example: 99.99
 *       required:
 *         - id
 *         - productId
 *         - quantity
 *         - price
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: integer
 *           example: 10
 *         type:
 *           type: string
 *           example: "online"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         total:
 *           type: number
 *           example: 199.98
 *         status:
 *           type: string
 *           example: "pending"
 *         date:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - userId
 *         - type
 *         - items
 *         - total
 *         - status
 *         - date
 *     CreateOrderDto:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *           example: 10
 *         type:
 *           type: string
 *           example: "online"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         total:
 *           type: number
 *           example: 199.98
 *         status:
 *           type: string
 *           example: "pending"
 *       required:
 *         - userId
 *         - type
 *         - items
 *         - total
 *         - status
 *     UpdateOrderDto:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *         type:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         total:
 *           type: number
 *         status:
 *           type: string
 */
import { Router } from 'express';
import { validateBody } from '../middlewares/validation.middleware';
import { OrderController } from '../controller/order.controller';
import { OrderService } from '../services/order.service';

const router = Router();
const controller = new OrderController(new OrderService());

/**
 * @openapi
 * /api/orders:
 *   get:
 *     summary: Obtener todas las órdenes
 *     description: Devuelve todas las órdenes almacenadas en mock JSON y permite filtrar por usuario.
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filtrar órdenes por ID de usuario.
 *     responses:
 *       200:
 *         description: Lista de órdenes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/', controller.getAll.bind(controller));

/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener una orden por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Orden no encontrada
 */
router.get('/:id', controller.getById.bind(controller));

/**
 * @openapi
 * /api/orders:
 *   post:
 *     summary: Crear una nueva orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderDto'
 *     responses:
 *       201:
 *         description: Orden creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.post('/', validateBody([
    { field: 'userId', type: 'number' },
    { field: 'type', type: 'string' },
    { field: 'items', type: 'array' },
    { field: 'total', type: 'number' },
    { field: 'status', type: 'string' }
]), controller.create.bind(controller));

/**
 * @openapi
 * /api/orders/{id}:
 *   put:
 *     summary: Actualizar una orden existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderDto'
 *     responses:
 *       200:
 *         description: Orden actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Orden no encontrada
 */
router.put('/:id', validateBody([
    { field: 'userId', type: 'number', required: false },
    { field: 'type', type: 'string', required: false },
    { field: 'items', type: 'array', required: false },
    { field: 'total', type: 'number', required: false },
    { field: 'status', type: 'string', required: false }
]), controller.update.bind(controller));

/**
 * @openapi
 * /api/orders/{id}:
 *   delete:
 *     summary: Eliminar una orden
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       204:
 *         description: Orden eliminada
 *       404:
 *         description: Orden no encontrada
 */
router.delete('/:id', controller.delete.bind(controller));

export default router;
