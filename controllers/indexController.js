/**
 * Controlador de la página de inicio.
 * @module controllers/indexController
 */

/**
 * Maneja la ruta GET /
 * Renderiza la vista 'home' con el título de la página.
 *
 * @param {Object} req  - Objeto de petición de Express.
 * @param {Object} res  - Objeto de respuesta de Express.
 * @returns {void}
 */
function mostrarHome(req, res) {
  res.render('home', {
    title: 'Página principal'
  });
}

module.exports = { mostrarHome };
