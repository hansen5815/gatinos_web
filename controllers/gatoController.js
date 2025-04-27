const { listarGatosActivos } = require('../services/gatoService');

async function getGatos(req, res, next) {
  try {
    const gatos = listarGatosActivos();
    res.render('gatos/list', { gatos, title: 'Listado de Gatos' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getGatos };
