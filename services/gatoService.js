/**
 * Servicio de gatos.
 * Contiene la lógica de negocio: cálculo de estado de salud, filtrado y ordenación,
 * y delega la persistencia de datos al repositorio `gatoRepository`.
 *
 * @module services/gatoService
 */

const {
  getAllGatos,
  getGatoById,
  createGato,
  updateGato,
  deleteGato
} = require('../repositories/gatoRepository');

/**
 * Enum de niveles de salud.
 * @readonly
 * @enum {string}
 */
const EstadoSalud = {
  SANO:    'SANO',
  REGULAR: 'REGULAR',
  GRAVE:   'GRAVE'
};

/**
 * Calcula el estado de salud de un gato según criterios simplificados:
 * - GRAVE: si tiene alguna enfermedad registrada o no está vacunado o no pasó por CER
 * - REGULAR: si pasó CER y está vacunado, pero tiene enfermedades leves
 * - SANO: en caso contrario
 *
 * @param {Object} gato
 * @param {boolean} gato.vacunado     - Indicador de vacunación.
 * @param {boolean} gato.cer          - Indicador de protocolo CER.
 * @param {string[]} gato.enfermedades - Lista de enfermedades del gato.
 * @returns {string} Uno de los valores de `EstadoSalud`.
 */
function calcularEstadoSalud({ vacunado, cer, enfermedades }) {
  // 1) Si falta vacunación o CER → GRAVE
  if (!vacunado || !cer) {
    return EstadoSalud.GRAVE;
  }
  // 2) Si tiene enfermedades pero está vacunado y cer → REGULAR
  if (Array.isArray(enfermedades) && enfermedades.length > 0) {
    return EstadoSalud.REGULAR;
  }
  // 3) En caso contrario → SANO
  return EstadoSalud.SANO;
}

/**
 * Obtiene todos los gatos activos (no borrados), añade su estado de salud
 * y ordena el listado de peor a mejor estado.
 *
 * @async
 * @returns {Promise<Object[]>} Array de gatos con campo adicional `estadoSalud`.
 *                              Cada objeto incluye `coloniaId`.
 * @throws {Error} Si el repositorio falla.
 */
async function listarGatosActivos() {
  const all = await getAllGatos();
  const activos = all.filter(g => !g.fechaBorrado);
  const conSalud = activos.map(g => ({
    ...g,
    estadoSalud: calcularEstadoSalud(g)
  }));
  // Ordenar: GRAVE primero, luego REGULAR, luego SANO
  const orden = { [EstadoSalud.GRAVE]: 0, [EstadoSalud.REGULAR]: 1, [EstadoSalud.SANO]: 2 };
  return conSalud.sort((a, b) => orden[a.estadoSalud] - orden[b.estadoSalud]);
}

/**
 * Recupera un gato por su ID, calcula y añade su estado de salud.
 *
 * @async
 * @param {string|number} id - Identificador del gato.
 * @returns {Promise<Object>} Objeto gato con `estadoSalud` añadido.
 * @throws {Error} Si no se proporciona id o no existe el gato.
 */
async function recuperarPorId(id) {
  if (id == null) {
    throw new Error('ID no proporcionado');
  }
  const gato = await getGatoById(id);
  if (!gato) {
    throw new Error('Gato no encontrado');
  }
  return { ...gato, estadoSalud: calcularEstadoSalud(gato) };
}

/**
 * Crea un nuevo gato, persiste en el repositorio y devuelve
 * el objeto con estado de salud calculado.
 *
 * @async
 * @param {Object} datos
 * @param {string} datos.nombre
 * @param {number} datos.edad
 * @param {number} datos.peso
 * @param {boolean} datos.vacunado
 * @param {boolean} datos.cer
 * @param {string[]} datos.enfermedades
 * @param {string|number} datos.coloniaId
 * @returns {Promise<Object>} Gato creado con `estadoSalud`.
 * @throws {Error} Si faltan datos obligatorios.
 */
async function crearNuevoGato(datos) {
  const { nombre, edad, peso, vacunado, cer, enfermedades, coloniaId } = datos;
  if (
    !nombre ||
    typeof edad !== 'number' ||
    typeof peso !== 'number' ||
    coloniaId == null
  ) {
    throw new Error('Datos del gato incompletos');
  }
  const gato = await createGato({ nombre, edad, peso, vacunado, cer, enfermedades, coloniaId });
  return { ...gato, estadoSalud: calcularEstadoSalud(gato) };
}

/**
 * Actualiza los datos de un gato existente y devuelve
 * el objeto actualizado con nuevo estado de salud.
 *
 * @async
 * @param {Object} datos
 * @param {string|number} datos.id
 * @param {string} [datos.nombre]
 * @param {number} [datos.edad]
 * @param {number} [datos.peso]
 * @param {boolean} [datos.vacunado]
 * @param {boolean} [datos.cer]
 * @param {string[]} [datos.enfermedades]
 * @param {string|number} [datos.coloniaId]
 * @returns {Promise<Object>} Gato actualizado con `estadoSalud`.
 * @throws {Error} Si no se proporciona id o el gato no existe.
 */
async function actualizarDatosGato(datos) {
  const { id } = datos;
  if (id == null) {
    throw new Error('ID no proporcionado');
  }
  const gato = await updateGato(datos);
  return { ...gato, estadoSalud: calcularEstadoSalud(gato) };
}

/**
 * Marca un gato como borrado (lógico) y devuelve
 * el objeto con su estado de salud (no se usa para ordenación).
 *
 * @async
 * @param {string|number} id - Identificador del gato.
 * @returns {Promise<Object>} Gato marcado como borrado con `estadoSalud`.
 * @throws {Error} Si no se proporciona id o el gato no existe.
 */
async function eliminarRegistroGato(id) {
  if (id == null) {
    throw new Error('ID no proporcionado');
  }
  const gato = await deleteGato(id);
  return { ...gato, estadoSalud: calcularEstadoSalud(gato) };
}

module.exports = {
  EstadoSalud,
  listarGatosActivos,
  recuperarPorId,
  crearNuevoGato,
  actualizarDatosGato,
  eliminarRegistroGato
};
