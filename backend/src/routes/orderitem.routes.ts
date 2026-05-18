/**
 * @openapi
 * components:
 *   schemas:
 *     OrderItemSimple:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         productId:
 *           type: integer
 *           example: 2
 *         quantity:
 *           type: integer
 *           example: 3
 *         price:
 *           type: number
 *           example: 19.99
 *       required:
 *         - id
 *         - productId
 *         - quantity
 *         - price
 *     CreateOrderItemDto:
 *       type: object
 *       properties:
 *         productId:
 *           type: integer
 *           example: 2
 *         quantity:
 *           type: integer
 *           example: 3
 *         price:
 *           type: number
 *           example: 19.99
 *       required:
 *         - productId
 *         - quantity
 *         - price
 *     UpdateOrderItemDto:
 *       type: object
 *       properties:
 *         productId:
 *           type: integer
 *         quantity:
 *           type: integer
 *         price:
 *           type: number
 */
import { Router } from 'express';
import { validateBody } from '../middlewares/validation.middleware';
import { OrderItemController } from '../controller/orderitem.controller';
import { OrderItemService } from '../services/orderitem.service';

const router = Router();
const controller = new OrderItemController(new OrderItemService());

/**
 * @openapi
 * /api/order-items:
 *   get:
 *     summary: Obtener todos los items de orden
 *     description: Devuelve los items de orden almacenados en mock JSON.
 *     responses:
 *       200:
 *         description: Lista de items de orden
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderItemSimple'
 */
router.get('/', controller.getAll.bind(controller));

/**
 * @openapi
 * /api/order-items/{id}:
 *   get:
 *     summary: Obtener un item de orden por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del item de orden
 *     responses:
 *       200:
 *         description: Item de orden encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItemSimple'
 *       404:
 *         description: Item de orden no encontrado
 */
router.get('/:id', controller.getById.bind(controller));

/**
 * @openapi
 * /api/order-items:
 *   post:
 *     summary: Crear un nuevo item de orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderItemDto'
 *     responses:
 *       201:
 *         description: Item de orden creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItemSimple'
 */
router.post('/', validateBody([
    { field: 'productId', type: 'number' },
    { field: 'quantity', type: 'number' },
    { field: 'price', type: 'number' }
]), controller.create.bind(controller));

/**
 * @openapi
 * /api/order-items/{id}:
 *   put:
 *     summary: Actualizar un item de orden existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del item de orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderItemDto'
 *     responses:
 *       200:
 *         description: Item de orden actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItemSimple'
 *       404:
 *         description: Item de orden no encontrado
 */
router.put('/:id', validateBody([
    { field: 'productId', type: 'number', required: false },
    { field: 'quantity', type: 'number', required: false },
    { field: 'price', type: 'number', required: false }
]), controller.update.bind(controller));

/**
 * @openapi
 * /api/order-items/{id}:
 *   delete:
 *     summary: Eliminar un item de orden
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del item de orden
 *     responses:
 *       204:
 *         description: Item de orden eliminado
 *       404:
 *         description: Item de orden no encontrado
 */
router.delete('/:id', controller.delete.bind(controller));

export default router;
