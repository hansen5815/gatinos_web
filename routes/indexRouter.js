const express           = require('express');
const { mostrarHome }   = require('../controllers/indexController');
const router            = express.Router();

router.get('/', mostrarHome);

module.exports = router;
