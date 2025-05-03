const fs   = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'data', 'gatos.json');

function readData() {
  const raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw);
}

function writeData(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Devuelve todos los gatos
function getAllGatos() {
  return readData();
}

// Devuelve un gato por ID
function getGatoById(id) {
  if (id === undefined || id === null) {
    throw new Error('ID no proporcionado');
  }
  const gatos = readData();
  return gatos.find(g => String(g.id) === String(id));
}

// Crea un nuevo gato con ID correlativo
function createGato(gato) {
  if (
    !gato ||
    typeof gato.nombre !== 'string' ||
    typeof gato.edad   !== 'number' ||
    typeof gato.peso   !== 'number'
  ) {
    throw new Error('Datos del gato incompletos');
  }

  const gatos = readData();
  // calcular siguiente ID
  const maxId = gatos.reduce((max, g) => {
    const idNum = Number(g.id);
    return !isNaN(idNum) && idNum > max ? idNum : max;
  }, 0);

  const nuevo = {
    id: maxId + 1,
    ...gato,
    fechaBorrado: null
  };

  gatos.push(nuevo);
  writeData(gatos);
  return nuevo;
}

// Actualiza un gato existente o lanza "Gato no encontrado"
function updateGato(gatoActualizado) {
  const gatos = readData();
  // Buscamos índice con safe-access al id
  const idx = gatos.findIndex(g => 
    String(g.id) === String(gatoActualizado?.id)
  );

  if (idx < 0) {
    throw new Error('Gato no encontrado');
  }

  gatos[idx] = { ...gatos[idx], ...gatoActualizado };
  writeData(gatos);
  return gatos[idx];
}

// Marca un gato como borrado
function deleteGato(id) {
  if (id === undefined || id === null) {
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
