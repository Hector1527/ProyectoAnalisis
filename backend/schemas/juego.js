const Joi = require('joi');

const juegoSchema = Joi.object({
  nombre: Joi.string().min(1).max(50).required(),
  genero: Joi.string().valid('Aventura', 'RPG', 'FPS', 'Estrategia').required(),
  descripcion: Joi.string().min(1).max(500).optional(),  // descripción opcional pero con rango de longitud
  imagen: Joi.string().uri().optional(),                  // imagen debe ser una URL válida, opcional
  fechaLanzamiento: Joi.date().max('now').optional(),
  plataformas: Joi.array().items(Joi.string()).min(1).optional(),
  calificacion: Joi.number().min(0).max(5).optional()
});

module.exports = juegoSchema;
