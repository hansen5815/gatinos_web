// repositories/gatoRepository.js
const fs   = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'data', 'gatos.json');

function readData() {
  const raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw);
}

function writeData(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

// Devuelve todos los gatos (incluidos los de baja)
function getAllGatos() {
  return readData();
}

// Busca un gato por ID
function getGatoById(id) {
  const gatos = readData();
  return gatos.find(g => String(g.id) === String(id));
}

// Crea un nuevo gato
function createGato(gato) {
  const gatos = readData();
  // Generar ID único simple
  const nuevoId = Date.now();
  const nuevo = { id: nuevoId, ...gato, fechaBorrado: null };
  gatos.push(nuevo);
  writeData(gatos);
  return nuevo;
}

// Actualiza datos de un gato existente
function updateGato(gatoActualizado) {
  const gatos = readData();
  const idx = gatos.findIndex(g => String(g.id) === String(gatoActualizado.id));
  if (idx < 0) throw new Error('Gato no encontrado');
  gatos[idx] = { ...gatos[idx], ...gatoActualizado };
  writeData(gatos);
  return gatos[idx];
}

// Marca un gato como dado de baja
function deleteGato(id) {
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



/* Este bloque de código contiene las funciones para interactuar con la API de gatos.
   Se utiliza Axios para realizar las peticiones HTTP a la API. */

/* const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://localhost:8080',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

exports.getAllGatos = async () => {
  return await instance.get('/gatos')
    .then(res => res.data)
    .catch(err => {
      console.error('Error al obtener gatos:', err.message);
      throw err;
    });
};

exports.getGatoPorId = async (id) => {
  if (!id) throw new Error('ID no proporcionado');

  return await instance.get(`/gatos/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error(`Error al obtener gato con ID ${id}:`, err.message);
      throw err;
    });
};

exports.crearGato = async (gato) => {
  if (!gato) throw new Error('Datos del gato no proporcionados');

  return await instance.post('/gatos', gato)
    .then(res => res.data)
    .catch(err => {
      console.error('Error al crear gato:', err.message);
      throw err;
    });
};

exports.actualizarGato = async (gato) => {
  if (!gato || !gato.id) throw new Error('ID o datos de gato no proporcionados');

  return await instance.put(`/gatos/${gato.id}`, gato)
    .then(res => res.data)
    .catch(err => {
      console.error(`Error al actualizar gato con ID ${gato.id}:`, err.message);
      throw err;
    });
};

exports.eliminarGato = async (id) => {
  if (!id) throw new Error('ID no proporcionado');

  return await instance.delete(`/gatos/${id}`)
    .then(res => res.data)
    .catch(err => {
      console.error(`Error al eliminar gato con ID ${id}:`, err.message);
      throw err;
    });
}; */
