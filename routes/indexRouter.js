const express = require('express');
const router = express.Router();

// Ejemplo: ruta principal
router.get('/', (req, res) => {
  res.render('home', { title: 'Inicio' });
});

module.exports = router;
