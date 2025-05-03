const express = require('express');
const path = require('path');

const app = express();

// Sirve archivos estáticos desde la carpeta dist
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Tus rutas de API
app.get('/api/juegos', (req, res) => {
  res.json([{ nombre: "Ejemplo", genero: "Aventura" }]);
});

// Redirige todas las rutas no-API al frontend (para SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});