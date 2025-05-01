const { getAllGatos, createGato, updateGato, deleteGato } = require('../repositories/gatoRepository');

// Enum de salud
const SaludEstado = {
  GRAVE:   'GRAVE',
  REGULAR: 'REGULAR',
  SANO:    'SANO'
};

// Lógica de salud según enfermedades, vacunación y CER
function calcularEstadoSalud({ enfermedades, vacunado, cer }) {
  if (enfermedades && enfermedades.length > 0) {
    return SaludEstado.GRAVE;
  }
  if (!vacunado || !cer) {
    return SaludEstado.REGULAR;
  }
  return SaludEstado.SANO;
}

// Listar activos (igual que antes)
function listarGatosActivos() {
  const all = getAllGatos();
  const activos = all
    .filter(g => !g.fechaBorrado)
    .map(g => ({ 
      ...g, 
      estadoSalud: calcularEstadoSalud(g) 
    }))
    // orden GRAVE → REGULAR → SANO
    .sort((a, b) => [SaludEstado.GRAVE, SaludEstado.REGULAR, SaludEstado.SANO]
      .indexOf(a.estadoSalud)
      - [SaludEstado.GRAVE, SaludEstado.REGULAR, SaludEstado.SANO]
      .indexOf(b.estadoSalud)
    );
  return activos;
}

// Recuperar por ID usando getAllGatos (para que el mock consolide aquí)
function recuperarPorId(id) {
  if (!id) throw new Error('ID no proporcionado');

  const all = getAllGatos();
  const gato = all.find(g => g.id === id || String(g.id) === String(id));
  if (!gato) throw new Error('Gato no encontrado');

  return { 
    ...gato,
    estadoSalud: calcularEstadoSalud(gato)
  };
}

// Crear y devolver ya enriquecido
function crearNuevoGato(gato) {
  if (!gato || !gato.nombre || typeof gato.edad !== 'number' || typeof gato.peso !== 'number') {
    throw new Error('Datos del gato incompletos');
  }
  const creado = createGato(gato);
  return {
    ...creado,
    estadoSalud: calcularEstadoSalud(creado)
  };
}

// Actualizar y devolver enriquecido
function actualizarDatosGato(gato) {
  if (!gato || !gato.id) {
    throw new Error('Gato o ID no proporcionado');
  }
  const actualizado = updateGato(gato);
  return {
    ...actualizado,
    estadoSalud: calcularEstadoSalud(actualizado)
  };
}

// Eliminar (lógico) y devolver enriquecido
function eliminarRegistroGato(id) {
  if (!id) {
    throw new Error('ID no proporcionado');
  }
  const eliminado = deleteGato(id);
  return {
    ...eliminado,
    estadoSalud: calcularEstadoSalud(eliminado)
  };
}

module.exports = {
  listarGatosActivos,
  recuperarPorId,
  crearNuevoGato,
  actualizarDatosGato,
  eliminarRegistroGato
};
