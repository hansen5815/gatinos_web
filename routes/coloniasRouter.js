const express = require('express');
const router = express.Router();

// Ejemplo: ruta de colonias
router.get('/', (req, res) => {
  res.send('Listado de colonias');
});

module.exports = router;
