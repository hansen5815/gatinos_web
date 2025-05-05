/**
 * Controlador de gatos.
 * Provee las acciones CRUD y delega la lógica de negocio a `gatoService`.
 *
 * @module controllers/gatoController
 */

const {
  listarGatosActivos,
  recuperarPorId,
  crearNuevoGato,
  actualizarDatosGato,
  eliminarRegistroGato
} = require('../services/gatoService');
const { listarColonias } = require('../services/coloniaService');

/**
 * GET /gatos
 * Lista todos los gatos activos, calcula su estado de salud y renderiza la vista.
 *
 * @param {Object}   req  - Objeto de petición de Express.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Middleware next en caso de error.
 * @returns {Promise<void>}
 */
async function listarGatos(req, res, next) {
  try {
    const gatos = await listarGatosActivos();
    res.render('gatos/list', {
      title: 'Listado de Gatos',
      gatos
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /gatos/new
 * Muestra el formulario para crear un nuevo gato, incluyendo la selección de colonia.
 *
 * @param {Object}   req  - Objeto de petición de Express.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Middleware next en caso de error.
 * @returns {Promise<void>}
 */
async function mostrarFormularioCrear(req, res, next) {
  try {
    const colonias = await listarColonias();
    res.render('gatos/new', {
      title: 'Crear Gato',
      colonias
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /gatos
 * Crea un nuevo gato con los datos enviados en el formulario y redirige al listado.
 *
 * @param {Object}   req  - Objeto de petición, con `req.body` conteniendo los datos del gato.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Middleware next en caso de error.
 * @returns {Promise<void>}
 */
async function crearGato(req, res, next) {
  try {
    const datos = req.body;
    await crearNuevoGato({
      nombre:       datos.nombre,
      edad:         Number(datos.edad),
      peso:         Number(datos.peso),
      vacunado:     datos.vacunado === 'on' || datos.vacunado === true,
      cer:          datos.cer === 'on'      || datos.cer === true,
      enfermedades: Array.isArray(datos.enfermedades)
                       ? datos.enfermedades
                       : datos.enfermedades
                         ? [datos.enfermedades]
                         : [],
      coloniaId:    datos.coloniaId
    });
    res.redirect('/gatos');
  } catch (err) {
    next(err);
  }
}

/**
 * GET /gatos/:id
 * Recupera un gato por su ID y renderiza la vista detalle.
 *
 * @param {Object}   req  - Objeto de petición con `req.params.id`.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Middleware next en caso de error.
 * @returns {Promise<void>}
 */
async function mostrarDetalleGato(req, res, next) {
  try {
    const gato = await recuperarPorId(req.params.id);
    res.render('gatos/detail', {
      title: `Gato ${req.params.id}`,
      gato
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /gatos/:id/edit
 * Muestra el formulario para editar un gato, precargando sus datos y la lista de colonias.
 *
 * @param {Object}   req  - Objeto de petición con `req.params.id`.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Middleware next en caso de error.
 * @returns {Promise<void>}
 */
async function mostrarFormularioEditar(req, res, next) {
  try {
    const [colonias, gato] = await Promise.all([
      listarColonias(),
      recuperarPorId(req.params.id)
    ]);
    res.render('gatos/edit', {
      title: `Editar Gato ${req.params.id}`,
      gato,
      colonias
    });
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /gatos/:id
 * Actualiza los datos de un gato existente y redirige al listado.
 *
 * @param {Object}   req  - Objeto de petición con `req.params.id` y `req.body`.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Middleware next en caso de error.
 * @returns {Promise<void>}
 */
async function actualizarGato(req, res, next) {
  try {
    const datos = req.body;
    await actualizarDatosGato({
      id:            req.params.id,
      nombre:        datos.nombre,
      edad:          Number(datos.edad),
      peso:          Number(datos.peso),
      vacunado:      datos.vacunado === 'on' || datos.vacunado === true,
      cer:           datos.cer === 'on'      || datos.cer === true,
      enfermedades:  Array.isArray(datos.enfermedades)
                         ? datos.enfermedades
                         : datos.enfermedades
                           ? [datos.enfermedades]
                           : [],
      coloniaId:     datos.coloniaId
    });
    res.redirect('/gatos');
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /gatos/:id
 * Marca un gato como borrado y redirige al listado.
 *
 * @param {Object}   req  - Objeto de petición con `req.params.id`.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Middleware next en caso de error.
 * @returns {Promise<void>}
 */
async function eliminarGato(req, res, next) {
  try {
    await eliminarRegistroGato(req.params.id);
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
