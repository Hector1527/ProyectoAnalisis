const express = require('express');
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const juegosRouter = require('./routes/juego');
const swaggerUi = require('swagger-ui-express');
const specs = require('./docs/swagger'); 
const mongoose = require("mongoose");


const app = express();

// Sirve archivos estáticos desde la carpeta dist
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Tus rutas de API
app.get('/api/juegos', (req, res) => {
  res.json([{ nombre: "Ejemplo", genero: "Aventura" }]);
});

// Ruta raíz debe definirse ANTES del catch-all
app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

// Redirige todas las rutas no-API al frontend (para SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error MongoDB:', err));

  app.use(express.json());
app.use('/api/juegos', juegosRouter); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
