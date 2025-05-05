/**
 * Repositorio para gestión de datos de gatos.
 * Opera sobre `data/gatos.json` y provee las operaciones CRUD,
 * incluyendo la asociación de cada gato con una colonia.
 *
 * @module repositories/gatoRepository
 */

const fs   = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'data', 'gatos.json');

/**
 * Objeto Gato.
 * @typedef {Object} Gato
 * @property {number}            id             Identificador único.
 * @property {string}            nombre         Nombre del gato.
 * @property {number}            edad           Edad en años.
 * @property {number}            peso           Peso en kilogramos.
 * @property {boolean}           vacunado       Indica si está vacunado.
 * @property {boolean}           cer            Indica si pasó por CER.
 * @property {string[]}          enfermedades   Lista de enfermedades.
 * @property {string|number}     coloniaId      ID de la colonia asociada.
 * @property {string|null}       fechaBorrado   Fecha ISO de borrado lógico, o null.
 */

/**
 * Lee y parsea el fichero JSON de gatos.
 *
 * @private
 * @returns {Gato[]} Array con todos los gatos.
 * @throws {Error} Si falla la lectura o el parseo.
 */
function readData() {
  const raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw);
}

/**
 * Serializa y escribe el array de gatos en el fichero JSON.
 *
 * @private
 * @param {Gato[]} data Array de objetos Gato a escribir.
 * @throws {Error} Si falla la escritura.
 */
function writeData(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

/**
 * Devuelve todos los gatos (incluidos los marcados como borrados).
 *
 * @returns {Gato[]} Array con todos los gatos.
 */
function getAllGatos() {
  return readData();
}

/**
 * Recupera un gato por su ID.
 *
 * @param {string|number} id - Identificador del gato.
 * @returns {Gato|undefined} El Gato encontrado, o undefined si no existe.
 * @throws {Error} Si no se proporciona un id.
 */
function getGatoById(id) {
  if (id == null) {
    throw new Error('ID no proporcionado');
  }
  const gatos = readData();
  return gatos.find(g => String(g.id) === String(id));
}

/**
 * Crea un nuevo gato con ID correlativo.
 *
 * @param {Object} gato                         Datos del nuevo gato.
 * @param {string} gato.nombre                  Nombre del gato.
 * @param {number} gato.edad                    Edad en años.
 * @param {number} gato.peso                    Peso en kg.
 * @param {boolean} gato.vacunado               Indicador de vacunación.
 * @param {boolean} gato.cer                    Indicador de protocolo CER.
 * @param {string[]} gato.enfermedades          Lista de enfermedades.
 * @param {string|number} gato.coloniaId        ID de la colonia asociada.
 * @returns {Gato} El objeto Gato creado.
 * @throws {Error} Si faltan datos obligatorios o son de tipo incorrecto.
 */
function createGato(gato) {
  if (
    !gato ||
    typeof gato.nombre !== 'string' ||
    typeof gato.edad   !== 'number' ||
    typeof gato.peso   !== 'number' ||
    typeof gato.coloniaId === 'undefined'
  ) {
    throw new Error('Datos del gato incompletos');
  }

  const gatos = readData();
  const maxId = gatos.reduce((max, g) => {
    const n = Number(g.id);
    return !isNaN(n) && n > max ? n : max;
  }, 0);

  const nuevo = {
    id:            maxId + 1,
    nombre:        gato.nombre,
    edad:          gato.edad,
    peso:          gato.peso,
    vacunado:      Boolean(gato.vacunado),
    cer:           Boolean(gato.cer),
    enfermedades:  Array.isArray(gato.enfermedades)
                     ? gato.enfermedades
                     : gato.enfermedades
                       ? [gato.enfermedades]
                       : [],
    coloniaId:     gato.coloniaId,
    fechaBorrado:  null
  };

  gatos.push(nuevo);
  writeData(gatos);
  return nuevo;
}

/**
 * Actualiza un gato existente (incluyendo su coloniaId).
 *
 * @param {Object}   gatoActualizado               Datos del gato a actualizar.
 * @param {string|number} gatoActualizado.id       Identificador del gato.
 * @param {string}   [gatoActualizado.nombre]      Nuevo nombre.
 * @param {number}   [gatoActualizado.edad]        Nueva edad.
 * @param {number}   [gatoActualizado.peso]        Nuevo peso.
 * @param {boolean}  [gatoActualizado.vacunado]    Indicador de vacunación.
 * @param {boolean}  [gatoActualizado.cer]         Indicador de protocolo CER.
 * @param {string[]} [gatoActualizado.enfermedades] Lista de enfermedades.
 * @param {string|number} [gatoActualizado.coloniaId] ID de colonia.
 * @returns {Gato} El objeto Gato actualizado.
 * @throws {Error} Si no se encuentra el gato.
 */
function updateGato(gatoActualizado) {
  const gatos = readData();
  const idx = gatos.findIndex(g => String(g.id) === String(gatoActualizado?.id));
  if (idx < 0) {
    throw new Error('Gato no encontrado');
  }
  gatos[idx] = { ...gatos[idx], ...gatoActualizado };
  writeData(gatos);
  return gatos[idx];
}

/**
 * Marca un gato como borrado (fechaBorrado = ahora).
 *
 * @param {string|number} id - Identificador del gato a eliminar.
 * @returns {Gato} El objeto Gato con fechaBorrado asignada.
 * @throws {Error} Si no se proporciona id o no existe el gato.
 */
function deleteGato(id) {
  if (id == null) {
    throw new Error('ID no proporcionado');
  }
  const gatos = readData();
  const idx   = gatos.findIndex(g => String(g.id) === String(id));
  if (idx < 0) {
    throw new Error('Gato no encontrado');
  }
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
