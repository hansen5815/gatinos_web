/**
 * Controlador de gatos.
 * Provee las acciones CRUD para el recurso “gato”, incluyendo la asociación
 * con colonias y el cálculo de estado de salud.
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
 * Obtiene todos los gatos activos, añade el nombre de su colonia
 * y renderiza la vista de listado.
 *
 * @param {Object}   req  - Objeto de petición de Express.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Middleware para manejar errores.
 * @returns {Promise<void>}
 */
async function listarGatos(req, res, next) {
  try {
    const [gatos, colonias] = await Promise.all([
      listarGatosActivos(),
      listarColonias()
    ]);

    // Añadir el nombre de la colonia a cada gato
    const gatosConColonia = gatos.map(g => {
      const colonia = colonias.find(c => String(c.id) === String(g.coloniaId));
      return {
        ...g,
        coloniaNombre: colonia ? colonia.nombre : '—'
      };
    });

    res.render('gatos/list', {
      title: 'Listado de Gatos',
      gatos: gatosConColonia
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /gatos/new
 * Muestra el formulario para crear un nuevo gato,
 * incluyendo la lista de colonias disponibles.
 *
 * @param {Object}   req  - Objeto de petición de Express.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Middleware para manejar errores.
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
 * Procesa el formulario de creación, crea el gato
 * y redirige al listado.
 *
 * @param {Object}   req  - req.body con los datos del gato.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Middleware para manejar errores.
 * @returns {Promise<void>}
 */
async function crearGato(req, res, next) {
  try {
    const d = req.body;
    await crearNuevoGato({
      nombre:       d.nombre,
      edad:         Number(d.edad),
      peso:         Number(d.peso),
      vacunado:     d.vacunado === 'on' || d.vacunado === true,
      cer:          d.cer === 'on'      || d.cer === true,
      enfermedades: Array.isArray(d.enfermedades)
                       ? d.enfermedades
                       : d.enfermedades
                         ? [d.enfermedades]
                         : [],
      coloniaId:    d.coloniaId
    });
    res.redirect('/gatos');
  } catch (err) {
    next(err);
  }
}

/**
 * GET /gatos/:id
 * Recupera un gato por ID y renderiza la vista de detalle.
 *
 * @param {Object}   req  - req.params.id es el identificador del gato.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Middleware para manejar errores.
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
 * Muestra el formulario de edición para un gato existente,
 * precargando sus datos y la lista de colonias.
 *
 * @param {Object}   req  - req.params.id es el identificador del gato.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Middleware para manejar errores.
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
 * Procesa el formulario de edición, actualiza el gato
 * y redirige al listado.
 *
 * @param {Object}   req  - req.params.id e req.body con los datos actualizados.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Middleware para manejar errores.
 * @returns {Promise<void>}
 */
async function actualizarGato(req, res, next) {
  try {
    const d = req.body;
    await actualizarDatosGato({
      id:            req.params.id,
      nombre:        d.nombre,
      edad:          Number(d.edad),
      peso:          Number(d.peso),
      vacunado:      d.vacunado === 'on' || d.vacunado === true,
      cer:           d.cer === 'on'      || d.cer === true,
      enfermedades:  Array.isArray(d.enfermedades)
                         ? d.enfermedades
                         : d.enfermedades
                           ? [d.enfermedades]
                           : [],
      coloniaId:     d.coloniaId
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
 * @param {Object}   req  - req.params.id es el identificador del gato.
 * @param {Object}   res  - Objeto de respuesta de Express.
 * @param {Function} next - Middleware para manejar errores.
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
