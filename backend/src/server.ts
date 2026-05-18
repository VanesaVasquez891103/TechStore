import express from 'express';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import specs from './config/swagger.config';
import routes from './routes';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { notFoundMiddleware } from './middlewares/not-found.middleware';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use('/assets', express.static(path.join(process.cwd(), 'assets')));

app.use('/api/categories', routes.categoryRoutes);
app.use('/api/products', routes.productRoutes);
app.use('/api/orders', routes.orderRoutes);
app.use('/api/order-items', routes.orderItemRoutes);
app.use('/api/users', routes.userRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Optica API - catalogo mock en JSON', docs: '/api/docs' });
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`TechStore API escuchando en http://localhost:${port}`);
  console.log(`Documentación Swagger disponible en http://localhost:${port}/api/docs`);
});

export default app;
