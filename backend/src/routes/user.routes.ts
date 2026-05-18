import { Router } from 'express';
import { validateBody } from '../middlewares/validation.middleware';
import { UserController } from '../controller/user.controller';
import { UserService } from '../services/user.service';

const router = Router();
const controller = new UserController(new UserService());

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 */
router.post('/register', validateBody([
    { field: 'name', type: 'string' },
    { field: 'email', type: 'string' },
    { field: 'password', type: 'string' }
]), controller.register.bind(controller));

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', validateBody([
    { field: 'email', type: 'string' },
    { field: 'password', type: 'string' }
]), controller.login.bind(controller));

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Obtener información de usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', controller.getById.bind(controller));

export default router;
