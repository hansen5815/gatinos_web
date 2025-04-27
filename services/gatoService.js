const { getAllGatos } = require('../repositories/gatoRepository');

/**
 * Calcula un estado de salud simplificado:
 * - 'Bueno' si peso/edad > 0.7
 * - 'Regular' si peso/edad entre 0.5 y 0.7
 * - 'Malo' en caso contrario
 */
function calcularEstadoSalud({ peso, edad }) {
  const ratio = peso / edad;
  if (ratio > 0.7)        return 'Bueno';
  if (ratio >= 0.5)       return 'Regular';
  return 'Malo';
}

function listarGatosActivos() {
  // 1) Cargar todos
  const all = getAllGatos();
  // 2) Filtrar sólo los no borrados
  const activos = all.filter(g => !g.fechaBorrado);
  // 3) Mapear y añadir estadoSalud
  const conSalud = activos.map(g => ({
    ...g,
    estadoSalud: calcularEstadoSalud(g)
  }));
  // 4) Ordenar por estadoSalud (Bueno → Regular → Malo)
  const orden = { 'Bueno': 0, 'Regular': 1, 'Malo': 2 };
  return conSalud.sort((a, b) => orden[a.estadoSalud] - orden[b.estadoSalud]);
}

module.exports = { listarGatosActivos };
