const Joi = require('joi');

const juegoSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  genero: Joi.string().valid('Aventura', 'RPG', 'FPS', 'Estrategia').required(),
  fechaLanzamiento: Joi.date().max('now'),
  plataformas: Joi.array().items(Joi.string()).min(1),
  calificacion: Joi.number().min(0).max(5)
});

module.exports = juegoSchema;
