const mongoose = require('mongoose');

const videojuegoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  genero: { type: [String], required: true }, // Array de strings
  plataforma: { type: [String], required: true },
  lanzamiento: { type: Date, required: true },
  imagenURL: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 }
});

module.exports = mongoose.model('Videojuego', videojuegoSchema);