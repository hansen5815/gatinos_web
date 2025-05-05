/**
 * Repositorio para gestión de datos de colonias.
 * Lee y escribe en `data/colonias.json`.
 *
 * @module repositories/coloniaRepository
 */

const fs   = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'data', 'colonias.json');

/**
 * Lee y parsea el fichero de colonias.
 * @private
 * @returns {Object[]} Array de colonias.
 */
function readData() {
  const raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw);
}

/**
 * Escribe el array de colonias en disco.
 * @private
 * @param {Object[]} data Array de colonias.
 */
function writeData(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

/**
 * Devuelve todas las colonias.
 * @returns {Object[]} Array de colonias.
 */
function listarColonias() {
  return readData();
}

/**
 * Recupera una colonia por ID.
 * @param {string|number} id - ID de la colonia.
 * @returns {Object|undefined} Objeto colonia o undefined.
 * @throws {Error} Si no se proporciona id.
 */
function recuperarPorId(id) {
  if (id === undefined || id === null) {
    throw new Error('ID no proporcionado');
  }
  const colonias = readData();
  return colonias.find(c => String(c.id) === String(id));
}

/**
 * Crea una nueva colonia.
 * @param {Object} colonia - Datos de la colonia.
 * @returns {Object} La colonia creada.
 * @throws {Error} Si falta el objeto colonia.
 */
function crearColonia(colonia) {
  if (!colonia || typeof colonia !== 'object') {
    throw new Error('Colonia no proporcionada');
  }
  const colonias = readData();
  const maxId = colonias.reduce((max, c) => {
    const n = Number(c.id);
    return !isNaN(n) && n > max ? n : max;
  }, 0);
  const nueva = { id: String(maxId + 1), ...colonia };
  colonias.push(nueva);
  writeData(colonias);
  return nueva;
}

/**
 * Actualiza una colonia existente.
 * @param {Object} coloniaActualizada - Datos con id y campos a cambiar.
 * @returns {Object} La colonia actualizada.
 * @throws {Error} Si no hay id o no se encuentra.
 */
function actualizarColonia(coloniaActualizada) {
  if (!coloniaActualizada || coloniaActualizada.id == null) {
    throw new Error('ID no proporcionado');
  }
  const colonias = readData();
  const idx = colonias.findIndex(c => String(c.id) === String(coloniaActualizada.id));
  if (idx < 0) throw new Error('Colonia no encontrada');
  colonias[idx] = { ...colonias[idx], ...coloniaActualizada };
  writeData(colonias);
  return colonias[idx];
}

/**
 * Elimina una colonia (filtrado).
 * @param {string|number} id - ID de la colonia.
 * @returns {boolean} true si se eliminó.
 * @throws {Error} Si no hay id o no existe.
 */
function eliminarColonia(id) {
  if (id === undefined || id === null) {
    throw new Error('ID no proporcionado');
  }
  const colonias = readData();
  const filtradas = colonias.filter(c => String(c.id) !== String(id));
  if (filtradas.length === colonias.length) {
    throw new Error('Colonia no encontrada');
  }
  writeData(filtradas);
  return true;
}

module.exports = {
  listarColonias,
  recuperarPorId,
  crearColonia,
  actualizarColonia,
  eliminarColonia
};
