import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Optica Clara API',
      version: '1.0.0',
      description: 'API para gestion de una tienda optica con catalogo de gafas, lentes y accesorios.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./src/**/*.ts'], // Archivos donde estan los comentarios @swagger
};

const specs = swaggerJSDoc(options);

export default specs;
