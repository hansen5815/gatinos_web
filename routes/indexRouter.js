const express = require('express');
const router = express.Router();

// Página principal
router.get('/', (req, res) => {
  res.render('home', { title: 'Página principal' });
});

module.exports = router;
