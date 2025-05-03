// controllers/indexController.js

/**
 * Handler para la página de inicio (/).
 * Renderiza la vista 'home' con la variable title.
 */
function mostrarHome(req, res) {
    res.render('home', {
      title: 'Página principal'
    });
  }
  
  module.exports = { mostrarHome };
  