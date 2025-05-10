const express = require('express');
const router = express.Router();
const Juego = require('../models/Juego');
const { juegoSchema } = require('../schemas/juego');
const validarJuego = (req, res, next) => {
  const { error } = juegoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// GET /api/juegos
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, genero, sort = '-fechaLanzamiento' } = req.query;
    const query = genero ? { genero } : {};

    const juegos = await Juego.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Juego.countDocuments(query);

    res.json({
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      juegos
    });
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;

// POST /api/juegos
router.post('/', async (req, res) => {
  try {
    const juego = new Juego(req.body);
    await juego.save();
    res.status(201).json(juego);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/juegos/:id
router.put('/:id', async (req, res) => {
  try {
    const juego = await Juego.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!juego) return res.status(404).json({ error: 'Juego no encontrado' });
    res.json(juego);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/juegos/:id
router.delete('/:id', async (req, res) => {
  try {
    const juego = await Juego.findByIdAndDelete(req.params.id);
    if (!juego) return res.status(404).json({ error: 'Juego no encontrado' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.post('/', validarJuego, async (req, res) => {  });
router.put('/:id', validarJuego, async (req, res) => {  });

/**
 * @swagger
 * /api/juegos:
 *   get:
 *     summary: Obtiene todos los juegos
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: genero
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de juegos
 */
router.get('/', async (req, res) => {  });
