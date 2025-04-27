const express = require('express');
const router = express.Router();
const { getGatos } = require('../controllers/gatoController');

console.log('Cargando rutas de GATOS');

router.get('/', getGatos);

module.exports = router;
