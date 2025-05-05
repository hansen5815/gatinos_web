/**
 * Controlador de colonias.
 * Provee las acciones CRUD para el recurso "colonia",
 * delegando la lógica de negocio al servicio correspondiente.
 *
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
 * Lista todas las colonias y renderiza la vista 'colonias/list'.
 *
 * @param {Object}   req  - Objeto de petición de Express.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
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
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void}
 */
function mostrarFormularioCrear(req, res) {
  res.render('colonias/new', {
    title: 'Crear Colonia'
  });
}

/**
 * POST /colonias
 * Crea una nueva colonia a partir de los datos del formulario
 * y redirige al listado de colonias.
 *
 * @param {Object}   req  - Objeto de petición, con req.body conteniendo:
 *                          { nombre, telefono?, descripcion?, latitud?, longitud? }.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>}
 */
async function crearNuevaColonia(req, res, next) {
  try {
    const { nombre, telefono, descripcion, latitud, longitud } = req.body;
    await svcCrearColonia({
      nombre,
      telefono,
      descripcion,
      latitud:  latitud  ? parseFloat(latitud)  : undefined,
      longitud: longitud ? parseFloat(longitud) : undefined
    });
    res.redirect('/colonias');
  } catch (err) {
    next(err);
  }
}

/**
 * GET /colonias/:id
 * Recupera y muestra el detalle de una colonia específica.
 *
 * @param {Object}   req  - Objeto de petición, con req.params.id.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
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
 * Muestra el formulario para editar una colonia existente,
 * precargando sus datos.
 *
 * @param {Object}   req  - Objeto de petición, con req.params.id.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
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
 * Actualiza una colonia existente con los datos del formulario
 * y redirige al listado de colonias.
 *
 * @param {Object}   req  - Objeto de petición, con:
 *                          req.params.id y req.body { nombre, telefono?, descripcion?, latitud?, longitud? }.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
 * @returns {Promise<void>}
 */
async function actualizarColonia(req, res, next) {
  try {
    const { id } = req.params;
    const { nombre, telefono, descripcion, latitud, longitud } = req.body;
    await svcActualizarColonia({
      id,
      nombre,
      telefono,
      descripcion,
      latitud:  latitud  ? parseFloat(latitud)  : undefined,
      longitud: longitud ? parseFloat(longitud) : undefined
    });
    res.redirect('/colonias');
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /colonias/:id
 * Elimina (lógicamente) una colonia y redirige al listado.
 *
 * @param {Object}   req  - Objeto de petición, con req.params.id.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Función middleware para manejo de errores.
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
