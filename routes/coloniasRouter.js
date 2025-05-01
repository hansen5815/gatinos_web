const express = require('express');
const router = express.Router();

// Listado de colonias (temporal)
router.get('/', (req, res) => {
  res.send('Listado de colonias');
});

module.exports = router;
