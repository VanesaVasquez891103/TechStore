import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TechStore API',
      version: '1.0.0',
      description: 'API para gestión de tienda tecnológica con mock data en JSON',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./src/**/*.ts'], // Archivos donde están los comentarios @swagger
};

const specs = swaggerJSDoc(options);

export default specs;