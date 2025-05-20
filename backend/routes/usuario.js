const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.post('/registro', async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
