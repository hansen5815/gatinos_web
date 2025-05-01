const {
  getAllGatos,
  getGatoById,
  createGato,
  updateGato,
  deleteGato
} = require('../repositories/gatoRepository');

/**
 * Calcula un estado de salud simplificado:
 * - 'Bueno' si peso/edad > 0.7
 * - 'Regular' si peso/edad entre 0.5 y 0.7
 * - 'Malo' en caso contrario
 */
function calcularEstadoSalud({ peso, edad }) {
  const ratio = peso / edad;
  if (ratio > 0.7) return 'Bueno';
  if (ratio >= 0.5) return 'Regular';
  return 'Malo';
}

/**
 * Listar todos los gatos activos (sin fecha de borrado),
 * calcular su estado de salud y ordenarlos por éste.
 */
async function listarGatosActivos() {
  const gatos = getAllGatos();
  const activos = gatos
    .filter(g => !g.fechaBorrado)
    .map(g => ({
      ...g,
      estadoSalud: calcularEstadoSalud(g)
    }));

  const orden = { 'Bueno': 0, 'Regular': 1, 'Malo': 2 };
  return activos.sort((a, b) => orden[a.estadoSalud] - orden[b.estadoSalud]);
}

/**
 * Recuperar un gato por su ID.
 */
async function recuperarPorId(id) {
  if (!id) throw new Error('ID no proporcionado');
  return getGatoById(id);
}

/**
 * Crear un nuevo gato.
 */
async function crearNuevoGato(gato) {
  if (!gato || !gato.nombre || typeof gato.edad !== 'number' || typeof gato.peso !== 'number') {
    throw new Error('Datos del gato inválidos');
  }
  return createGato(gato);
}

/**
 * Actualizar un gato existente.
 */
async function actualizarDatosGato(gato) {
  if (!gato || !gato.id) throw new Error('ID o datos del gato no proporcionados');
  return updateGato(gato);
}

/**
 * Eliminar (marcar como borrado) un gato por su ID.
 */
async function eliminarRegistroGato(id) {
  if (!id) throw new Error('ID no proporcionado');
  return deleteGato(id);
}

module.exports = {
  listarGatosActivos,
  recuperarPorId,
  crearNuevoGato,
  actualizarDatosGato,
  eliminarRegistroGato
};
