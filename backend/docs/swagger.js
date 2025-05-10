const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Juegos',
      version: '1.0.0',
      description: 'API para administrar videojuegos'
    },
    servers: [{ url: 'http://localhost:5000' }]
  },
  apis: ['./routes/*.js']  // Ruta a tus archivos de rutas
};

const specs = swaggerJSDoc(options);

module.exports = specs;
