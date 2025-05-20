const express = require('express');
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const juegosRouter = require('./routes/juego');
const swaggerUi = require('swagger-ui-express');
const specs = require('./docs/swagger'); 
const mongoose = require("mongoose");
const cors = require('cors');


const app = express();

app.use(cors({
  origin: 'https://tu-dominio-frontend.com'
}));

app.use(express.json());
app.use('/api/juegos', juegosRouter); 
app.use('/api/usuarios', require('./routes/usuario'));


// Ruta raíz debe definirse ANTES del catch-all
app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

// Redirige todas las rutas no-API al frontend (para SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error MongoDB:', err));

