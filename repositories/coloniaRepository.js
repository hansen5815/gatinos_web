const axios = require('axios');
const instance = axios.create({
    baseURL: 'https://localhost:8080',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

exports.listarColonias = async () => {
    // Realiza una solicitud GET a la API para obtener la lista de colonias
        return await instance.get('/colonias')
        .then(response => response.data)
        .catch(error => {
            console.error('Error al listar colonias:', error.message);
            throw error;
        });
}

exports.recuperarPorId = async (id) => {
    // Verifica si se ha proporcionado un ID
    if (!id) {
        throw new Error('ID no proporcionado');
    }
    // Realiza una solicitud GET a la API para obtener la colonia por ID
        return await instance.get('/colonias/${id}')
        .then(response => response.data)
        .catch(error => {
            console.error('Error al obtener colonia con ID ${id}:', error.message);
            throw error;
        });
}

exports.crearColonia = async (colonia) => {
        if (!colonia) {
            throw new Error('Colonia no proporcionada');
        }
    // Realiza una solicitud GET a la API para obtener la lista de colonias
        return await instance.post('/colonias',colonia)
        .then(response => response.data)
        .catch(error => {
            console.error('Error al listar colonias:', error.message);
            throw error;
        });
}

exports.actualizarColonia = async (colonia) => {
    if (!colonia) {
        throw new Error('Colonia no proporcionada');
    }
    if (!colonia.id) {
        throw new Error('ID de colonia no proporcionado');
    }
// Realiza una solicitud GET a la API para obtener la lista de colonias
    return await instance.put('/colonias',colonia)
    .then(response => response.data)
    .catch(error => {
        console.error('Error al listar colonias:', error.message);
        throw error;
    });
}