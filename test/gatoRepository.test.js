const fs = require('fs');
const path = require('path');

// Mockeamos el módulo fs
jest.mock('fs');

const {
  getAllGatos,
  getGatoById,
  createGato,
  updateGato,
  deleteGato
} = require('../repositories/gatoRepository');

describe('GatoRepository (mock FS)', () => {
  const sampleData = [
    { id: 1, nombre: 'Michi', edad: 3, peso: 4.2, fechaBorrado: null },
    { id: 2, nombre: 'Luna',  edad: 5, peso: 3.5, fechaBorrado: '2025-01-01' }
  ];

  beforeEach(() => {
    // Siempre partimos de la misma data en readFileSync
    fs.readFileSync.mockReturnValue(JSON.stringify(sampleData));
    fs.writeFileSync.mockClear();
  });

  test('getAllGatos → devuelve todos los gatos', () => {
    const gatos = getAllGatos();
    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.join(__dirname, '..', 'data', 'gatos.json'),
      'utf8'
    );
    expect(gatos).toEqual(sampleData);
  });

  test('getGatoById → happy path', () => {
    const gato = getGatoById(1);
    expect(gato).toEqual(sampleData[0]);
  });

  test('getGatoById → sin id lanza Error', () => {
    expect(() => getGatoById()).toThrow('ID no proporcionado');
  });

  test('getGatoById → si no existe devuelve undefined', () => {
    const gato = getGatoById(999);
    expect(gato).toBeUndefined();
  });

  test('createGato → happy path asigna id correlativo y escribe el fichero', () => {
    // De la muestra, el maxId es 2, así que el nuevo debería ser 3
    const nuevo = { nombre: 'Nube', edad: 2, peso: 3.0 };
    const creado = createGato(nuevo);

    expect(creado).toMatchObject({
      id: 3,
      nombre: 'Nube',
      edad: 2,
      peso: 3.0,
      fechaBorrado: null
    });
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  test('createGato → sin datos lanza Error', () => {
    expect(() => createGato()).toThrow('Datos del gato incompletos');
  });

  test('updateGato → happy path modifica y escribe el fichero', () => {
    const mod = { id: 1, nombre: 'MichiX', peso: 4.5 };
    const actualizado = updateGato(mod);
    expect(actualizado).toMatchObject({ id: 1, nombre: 'MichiX', peso: 4.5 });
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  test('updateGato → sin id lanza Error', () => {
    expect(() => updateGato({})).toThrow('Gato no encontrado');
  });

  test('deleteGato → happy path marca fechaBorrado y escribe', () => {
    const borrado = deleteGato(1);
    expect(borrado).toHaveProperty('fechaBorrado');
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  test('deleteGato → sin id lanza Error', () => {
    expect(() => deleteGato()).toThrow('ID no proporcionado');
  });
});