const {
  listarGatosActivos,
  recuperarPorId,
  crearNuevoGato,
  actualizarDatosGato,
  eliminarRegistroGato
} = require('../services/gatoService');

// Listar todos los gatos
async function listarGatos(req, res, next) {
  try {
    const gatos = await listarGatosActivos();
    res.render('gatos/list', { title: 'Listado de Gatos', gatos });
  } catch (err) {
    next(err);
  }
}

// Mostrar formulario para crear nuevo gato
function mostrarFormularioCrear(req, res) {
  res.render('gatos/new', { title: 'Crear Gato' });
}

// Crear un nuevo gato
async function crearGato(req, res, next) {
  try {
    const datos = req.body;
    await crearNuevoGato({
      nombre: datos.nombre,
      edad: Number(datos.edad),
      peso: Number(datos.peso),
      vacunado: datos.vacunado === 'on' || datos.vacunado === true,
      cer: datos.cer === 'on' || datos.cer === true,
      enfermedades: Array.isArray(datos.enfermedades)
        ? datos.enfermedades
        : datos.enfermedades
        ? [datos.enfermedades]
        : []
    });
    res.redirect('/gatos');
  } catch (err) {
    next(err);
  }
}

// Mostrar detalle de un gato
async function mostrarDetalleGato(req, res, next) {
  try {
    const { id } = req.params;
    const gato = await recuperarPorId(id);
    res.render('gatos/detail', { title: `Gato ${id}`, gato });
  } catch (err) {
    next(err);
  }
}

// Mostrar formulario para editar un gato
async function mostrarFormularioEditar(req, res, next) {
  try {
    const { id } = req.params;
    const gato = await recuperarPorId(id);
    res.render('gatos/edit', { title: `Editar Gato ${id}`, gato });
  } catch (err) {
    next(err);
  }
}

// Actualizar un gato existente
async function actualizarGato(req, res, next) {
  try {
    const { id } = req.params;
    const datos = req.body;
    await actualizarDatosGato({
      id,
      nombre: datos.nombre,
      edad: Number(datos.edad),
      peso: Number(datos.peso),
      vacunado: datos.vacunado === 'on' || datos.vacunado === true,
      cer: datos.cer === 'on' || datos.cer === true,
      enfermedades: Array.isArray(datos.enfermedades)
        ? datos.enfermedades
        : datos.enfermedades
        ? [datos.enfermedades]
        : []
    });
    res.redirect('/gatos');
  } catch (err) {
    next(err);
  }
}

// Eliminar (marcar) un gato
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