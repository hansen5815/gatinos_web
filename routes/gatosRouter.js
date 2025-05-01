const express = require('express');
const router = express.Router();
const controller = require('../controllers/gatoController');

// Listar todos los gatos
router.get('/', controller.listarGatos);

// Formulario crear
router.get('/new', controller.mostrarFormularioCrear);

// Crear
router.post('/', controller.crearGato);

// Detalle
router.get('/:id', controller.mostrarDetalleGato);

// Formulario editar
router.get('/:id/edit', controller.mostrarFormularioEditar);

// Actualizar (PUT)
router.put('/:id', controller.actualizarGato);

// Eliminar (DELETE)
router.delete('/:id', controller.eliminarGato);

module.exports = router;
