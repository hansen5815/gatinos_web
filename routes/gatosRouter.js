/**
 * Router de gatos.
 * @module routes/gatosRouter
 */

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/gatoController');

router.get('/', ctrl.listarGatos);
router.get('/new', ctrl.mostrarFormularioCrear);
router.post('/', ctrl.crearGato);
router.get('/:id', ctrl.mostrarDetalleGato);
router.get('/:id/edit', ctrl.mostrarFormularioEditar);
router.put('/:id', ctrl.actualizarGato);
router.delete('/:id', ctrl.eliminarGato);

module.exports = router;
