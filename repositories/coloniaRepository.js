const fs   = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'data', 'colonias.json');

function readData() {
  const raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw);
}

function writeData(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

/**
 * Devuelve el array completo de colonias
 */
function listarColonias() {
  return readData();
}

/**
 * Devuelve una colonia por su ID
 * @throws {Error} si no se proporciona ID
 */
function recuperarPorId(id) {
  if (id === undefined || id === null) {
    throw new Error('ID no proporcionado');
  }
  const colonias = readData();
  return colonias.find(c => String(c.id) === String(id));
}

/**
 * Crea una nueva colonia con ID correlativo
 * @throws {Error} si no se proporciona objeto colonia
 */
function crearColonia(colonia) {
  if (!colonia || typeof colonia !== 'object') {
    throw new Error('Colonia no proporcionada');
  }
  const colonias = readData();
  // calcular siguiente ID
  const maxId = colonias.reduce((max, c) => {
    const idNum = Number(c.id);
    return !isNaN(idNum) && idNum > max ? idNum : max;
  }, 0);
  const nueva = {
    id: String(maxId + 1),
    ...colonia
  };
  colonias.push(nueva);
  writeData(colonias);
  return nueva;
}

/**
 * Actualiza una colonia existente
 * @throws {Error} si no se proporciona colonia o le falta el ID
 * @throws {Error} si la colonia no existe
 */
function actualizarColonia(coloniaActualizada) {
  if (!coloniaActualizada || coloniaActualizada.id === undefined || coloniaActualizada.id === null) {
    throw new Error('ID no proporcionado');
  }
  const colonias = readData();
  const idx = colonias.findIndex(c => String(c.id) === String(coloniaActualizada.id));
  if (idx < 0) {
    throw new Error('Colonia no encontrada');
  }
  colonias[idx] = { ...colonias[idx], ...coloniaActualizada };
  writeData(colonias);
  return colonias[idx];
}

/**
 * Elimina (filtra) una colonia por ID
 * @throws {Error} si no se proporciona ID
 * @throws {Error} si la colonia no existe
 */
function eliminarColonia(id) {
  if (id === undefined || id === null) {
    throw new Error('ID no proporcionado');
  }
  const colonias = readData();
  const filtered = colonias.filter(c => String(c.id) !== String(id));
  if (filtered.length === colonias.length) {
    throw new Error('Colonia no encontrada');
  }
  writeData(filtered);
  return true;
}

module.exports = {
  listarColonias,
  recuperarPorId,
  crearColonia,
  actualizarColonia,
  eliminarColonia
};
