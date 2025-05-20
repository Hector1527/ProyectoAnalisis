const mongoose = require('mongoose');

const juegoSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'] 
  },
  genero: { 
    type: String, 
    enum: ['Aventura', 'RPG', 'FPS', 'Estrategia'], 
    required: true 
  },
  descripcion: { 
    type: String, 
    maxlength: 500 
  },
  imagen: { 
    type: String 
  },
  fechaLanzamiento: { 
    type: Date, 
    default: Date.now 
  },
  plataformas: [{ 
    type: String 
  }],
  calificacion: { 
    type: Number, 
    min: 0, 
    max: 5 
  }
});

module.exports = mongoose.model('Juego', juegoSchema);
