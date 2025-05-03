const express = require('express');
const router  = express.Router();
const controller = require('../controllers/coloniaController');

// Listado
router.get('/', controller.listarTodasColonias);

// Formulario crear
router.get('/new', controller.mostrarFormularioCrear);

// Crear
router.post('/', controller.crearNuevaColonia);

// Detalle
router.get('/:id', controller.mostrarDetalleColonia);

// Formulario editar
router.get('/:id/edit', controller.mostrarFormularioEditar);

// Actualizar (PUT)
router.put('/:id', controller.actualizarColonia);

// Eliminar (DELETE)
router.delete('/:id', controller.eliminarColonia);

module.exports = router;
