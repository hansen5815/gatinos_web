/**
 * Repositorio para gestión de datos de gatos.
 * Opera sobre `data/gatos.json`.
 *
 * @module repositories/gatoRepository
 */

const fs   = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'data', 'gatos.json');

/**
 * Lee el fichero de gatos.
 * @private
 * @returns {Object[]} Array de gatos.
 */
function readData() {
  const raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw);
}

/**
 * Escribe el array de gatos.
 * @private
 * @param {Object[]} data Array de gatos.
 */
function writeData(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

/**
 * Devuelve todos los gatos.
 * @returns {Object[]} Array de gatos.
 */
function getAllGatos() {
  return readData();
}

/**
 * Recupera un gato por ID.
 * @param {string|number} id - ID del gato.
 * @returns {Object|undefined} Gato o undefined.
 * @throws {Error} Si no se proporciona id.
 */
function getGatoById(id) {
  if (id == null) throw new Error('ID no proporcionado');
  const gatos = readData();
  return gatos.find(g => String(g.id) === String(id));
}

/**
 * Crea un nuevo gato.
 * @param {Object} gato - { nombre, edad, peso }.
 * @returns {Object} Gato creado.
 * @throws {Error} Si faltan datos o son de tipo incorrecto.
 */
function createGato(gato) {
  if (!gato || typeof gato.nombre !== 'string' ||
      typeof gato.edad   !== 'number' ||
      typeof gato.peso   !== 'number') {
    throw new Error('Datos del gato incompletos');
  }
  const gatos = readData();
  const maxId = gatos.reduce((max, g) => {
    const n = Number(g.id);
    return !isNaN(n) && n > max ? n : max;
  }, 0);
  const nuevo = { id: maxId + 1, ...gato, fechaBorrado: null };
  gatos.push(nuevo);
  writeData(gatos);
  return nuevo;
}

/**
 * Actualiza un gato existente.
 * @param {Object} gatoActualizado - Debe incluir id.
 * @returns {Object} Gato actualizado.
 * @throws {Error} Si no existe.
 */
function updateGato(gatoActualizado) {
  const gatos = readData();
  const idx = gatos.findIndex(g => String(g.id) === String(gatoActualizado?.id));
  if (idx < 0) throw new Error('Gato no encontrado');
  gatos[idx] = { ...gatos[idx], ...gatoActualizado };
  writeData(gatos);
  return gatos[idx];
}

/**
 * Marca un gato como borrado.
 * @param {string|number} id - ID del gato.
 * @returns {Object} Gato con fechaBorrado.
 * @throws {Error} Si no existe o falta id.
 */
function deleteGato(id) {
  if (id == null) throw new Error('ID no proporcionado');
  const gatos = readData();
  const idx = gatos.findIndex(g => String(g.id) === String(id));
  if (idx < 0) throw new Error('Gato no encontrado');
  gatos[idx].fechaBorrado = new Date().toISOString();
  writeData(gatos);
  return gatos[idx];
}

module.exports = {
  getAllGatos,
  getGatoById,
  createGato,
  updateGato,
  deleteGato
};
