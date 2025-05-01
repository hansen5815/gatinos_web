const coloniaRepository = require('../repositories/coloniaRepository');

exports.listarColonias = async () => {
    return await coloniaRepository.listarColonias();
};

exports.recuperarPorId = async (id) => {
    if (!id) {
        throw new Error('ID no proporcionado');
    }
    return await coloniaRepository.recuperarPorId(id);
};

exports.crearColonia = async (colonia) => {
    if (!colonia || !colonia.nombre) {
        throw new Error('Datos de colonia inválidos');
    }
    return await coloniaRepository.crearColonia(colonia);
};

exports.actualizarColonia = async (colonia) => {
    if (!colonia || !colonia.id) {
        throw new Error('Colonia o ID no proporcionado');
    }
    return await coloniaRepository.actualizarColonia(colonia);
};

exports.eliminarColonia = async (id) => {
    if (!id) {
        throw new Error('ID no proporcionado');
    }
    return await coloniaRepository.eliminarColonia(id);
};
