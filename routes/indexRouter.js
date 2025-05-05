/**
 * Router de la home.
 * @module routes/indexRouter
 */

const express       = require('express');
const router        = express.Router();
const { mostrarHome } = require('../controllers/indexController');

/**
 * GET /
 * Muestra la página principal.
 */
router.get('/', mostrarHome);

module.exports = router;
