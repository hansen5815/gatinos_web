const express = require('express');
const router  = express.Router();
const { getGatos } = require('../controllers/gatoController');

// GET /gatos
router.get('/', getGatos);

module.exports = router;
