/**
 * Controlador de gatos.
 * @module controllers/gatoController
 */

const {
  listarGatosActivos,
  recuperarPorId,
  crearNuevoGato,
  actualizarDatosGato,
  eliminarRegistroGato
} = require('../services/gatoService');

/**
 * GET /gatos
 * Lista todos los gatos activos.
 *
 * @param {Object} req   - Objeto de petición.
 * @param {Object} res   - Renderiza 'gatos/list'.
 * @param {Function} next - En caso de error.
 * @returns {Promise<void>}
 */
async function listarGatos(req, res, next) {
  try {
    const gatos = await listarGatosActivos();
    res.render('gatos/list', { title: 'Listado de Gatos', gatos });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /gatos/new
 * Muestra el formulario de creación.
 *
 * @param {Object} req - Petición.
 * @param {Object} res - Renderiza 'gatos/new'.
 * @returns {void}
 */
function mostrarFormularioCrear(req, res) {
  res.render('gatos/new', { title: 'Crear Gato' });
}

/**
 * POST /gatos
 * Crea un gato y redirige a /gatos.
 *
 * @param {Object} req   - req.body con los datos.
 * @param {Object} res   - Redirige a listado.
 * @param {Function} next - En caso de error.
 * @returns {Promise<void>}
 */
async function crearGato(req, res, next) {
  try {
    const d = req.body;
    await crearNuevoGato({
      nombre: d.nombre,
      edad:   Number(d.edad),
      peso:   Number(d.peso),
      vacunado: d.vacunado === 'on' || d.vacunado === true,
      cer:       d.cer === 'on'      || d.cer === true,
      enfermedades: Array.isArray(d.enfermedades)
        ? d.enfermedades
        : d.enfermedades
        ? [d.enfermedades]
        : []
    });
    res.redirect('/gatos');
  } catch (err) {
    next(err);
  }
}

/**
 * GET /gatos/:id
 * Muestra detalle de un gato.
 *
 * @param {Object} req   - req.params.id es el ID.
 * @param {Object} res   - Renderiza 'gatos/detail'.
 * @param {Function} next - En caso de error.
 * @returns {Promise<void>}
 */
async function mostrarDetalleGato(req, res, next) {
  try {
    const { id } = req.params;
    const gato = await recuperarPorId(id);
    res.render('gatos/detail', { title: `Gato ${id}`, gato });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /gatos/:id/edit
 * Muestra el formulario de edición.
 *
 * @param {Object} req   - req.params.id.
 * @param {Object} res   - Renderiza 'gatos/edit'.
 * @param {Function} next - En caso de error.
 * @returns {Promise<void>}
 */
async function mostrarFormularioEditar(req, res, next) {
  try {
    const { id } = req.params;
    const gato = await recuperarPorId(id);
    res.render('gatos/edit', { title: `Editar Gato ${id}`, gato });
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /gatos/:id
 * Actualiza un gato y redirige.
 *
 * @param {Object} req   - req.params.id y req.body.
 * @param {Object} res   - Redirige a /gatos.
 * @param {Function} next - En caso de error.
 * @returns {Promise<void>}
 */
async function actualizarGato(req, res, next) {
  try {
    const { id } = req.params;
    const d = req.body;
    await actualizarDatosGato({
      id,
      nombre: d.nombre,
      edad:   Number(d.edad),
      peso:   Number(d.peso),
      vacunado: d.vacunado === 'on' || d.vacunado === true,
      cer:       d.cer === 'on'      || d.cer === true,
      enfermedades: Array.isArray(d.enfermedades)
        ? d.enfermedades
        : d.enfermedades
        ? [d.enfermedades]
        : []
    });
    res.redirect('/gatos');
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /gatos/:id
 * Marca como borrado y redirige.
 *
 * @param {Object} req   - req.params.id.
 * @param {Object} res   - Redirige a /gatos.
 * @param {Function} next - En caso de error.
 * @returns {Promise<void>}
 */
async function eliminarGato(req, res, next) {
  try {
    const { id } = req.params;
    await eliminarRegistroGato(id);
    res.redirect('/gatos');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listarGatos,
  mostrarFormularioCrear,
  crearGato,
  mostrarDetalleGato,
  mostrarFormularioEditar,
  actualizarGato,
  eliminarGato
};
