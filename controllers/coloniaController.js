/**
 * Controlador de colonias.
 * @module controllers/coloniaController
 */

const {
  listarColonias,
  recuperarPorId,
  crearColonia: svcCrearColonia,
  actualizarColonia: svcActualizarColonia,
  eliminarColonia: svcEliminarColonia
} = require('../services/coloniaService');

/**
 * GET /colonias
 * Lista todas las colonias.
 *
 * @param {Object} req   - Objeto de petición de Express.
 * @param {Object} res   - Objeto de respuesta de Express.
 * @param {Function} next - Middleware next en caso de error.
 * @returns {Promise<void>}
 */
async function listarTodasColonias(req, res, next) {
  try {
    const colonias = await listarColonias();
    res.render('colonias/list', {
      title: 'Listado de Colonias',
      colonias
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /colonias/new
 * Muestra el formulario para crear una nueva colonia.
 *
 * @param {Object} req - Objeto de petición.
 * @param {Object} res - Objeto de respuesta.
 * @returns {void}
 */
function mostrarFormularioCrear(req, res) {
  res.render('colonias/new', {
    title: 'Crear Colonia'
  });
}

/**
 * POST /colonias
 * Crea una nueva colonia y redirige al listado.
 *
 * @param {Object} req   - req.body contiene { nombre }.
 * @param {Object} res   - Se redirige a /colonias.
 * @param {Function} next - En caso de error.
 * @returns {Promise<void>}
 */
async function crearNuevaColonia(req, res, next) {
  try {
    const datos = req.body;
    await svcCrearColonia({ nombre: datos.nombre });
    res.redirect('/colonias');
  } catch (err) {
    next(err);
  }
}

/**
 * GET /colonias/:id
 * Muestra el detalle de una colonia.
 *
 * @param {Object} req   - req.params.id es el ID.
 * @param {Object} res   - Se renderiza la vista detail.
 * @param {Function} next - En caso de error.
 * @returns {Promise<void>}
 */
async function mostrarDetalleColonia(req, res, next) {
  try {
    const { id } = req.params;
    const colonia = await recuperarPorId(id);
    res.render('colonias/detail', {
      title: `Colonia ${id}`,
      colonia
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /colonias/:id/edit
 * Muestra el formulario de edición de una colonia.
 *
 * @param {Object} req   - req.params.id es el ID.
 * @param {Object} res   - Vista edit.
 * @param {Function} next - En caso de error.
 * @returns {Promise<void>}
 */
async function mostrarFormularioEditar(req, res, next) {
  try {
    const { id } = req.params;
    const colonia = await recuperarPorId(id);
    res.render('colonias/edit', {
      title: `Editar Colonia ${id}`,
      colonia
    });
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /colonias/:id
 * Actualiza una colonia y redirige al listado.
 *
 * @param {Object} req   - req.params.id y req.body.nombre.
 * @param {Object} res   - Redirige a /colonias.
 * @param {Function} next - En caso de error.
 * @returns {Promise<void>}
 */
async function actualizarColonia(req, res, next) {
  try {
    const { id } = req.params;
    const datos = req.body;
    await svcActualizarColonia({ id, nombre: datos.nombre });
    res.redirect('/colonias');
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /colonias/:id
 * Elimina una colonia y redirige al listado.
 *
 * @param {Object} req   - req.params.id es el ID.
 * @param {Object} res   - Redirige a /colonias.
 * @param {Function} next - En caso de error.
 * @returns {Promise<void>}
 */
async function eliminarColonia(req, res, next) {
  try {
    const { id } = req.params;
    await svcEliminarColonia(id);
    res.redirect('/colonias');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listarTodasColonias,
  mostrarFormularioCrear,
  crearNuevaColonia,
  mostrarDetalleColonia,
  mostrarFormularioEditar,
  actualizarColonia,
  eliminarColonia
};
