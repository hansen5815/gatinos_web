const coloniaRepository = require('../repositories/coloniaRepository');

exports.listarColonias = async () => {
    return await coloniaRepository.listarColonias();
};

exports.recuperarPorId = async () => {
    if (!id) {
        throw new Error('ID no proporcionado');
    }
    
    return await coloniaRepository.recuperarPorId(id);
};

exports.crearColonia = async () => {
    return await coloniaRepository.crearColonia(colonia);
};

exports.actualizarColonia = async () => {
    if (!colonia) {
        throw new Error('Colonia no proporcionada');
    }
    if (!colonia.id) {
        throw new Error('ID de colonia no proporcionado');
    }

    return await coloniaRepository.actualizarColonia(colonia);
};

exports.eliminarColonia = async () => {
    if (!id) {
        throw new Error('ID no proporcionado');
    }

    return await coloniaRepository.eliminarColonia(id);
};