/**
 * Router de colonias.
 * @module routes/coloniasRouter
 */

const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/coloniaController");

router.get("/", ctrl.listarTodasColonias);
router.get("/new", ctrl.mostrarFormularioCrear);
router.post("/", ctrl.crearNuevaColonia);
router.get("/:id", ctrl.mostrarDetalleColonia);
router.get("/:id/edit", ctrl.mostrarFormularioEditar);
router.put("/:id", ctrl.actualizarColonia);
router.delete("/:id", ctrl.eliminarColonia);

module.exports = router;
