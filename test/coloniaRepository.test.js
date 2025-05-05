const fs   = require('fs');
const path = require('path');

// Mockeamos el módulo fs
jest.mock('fs');

const {
  listarColonias,
  recuperarPorId,
  crearColonia,
  actualizarColonia,
  eliminarColonia
} = require('../repositories/coloniaRepository');

describe('ColoniaRepository (mock FS)', () => {
  const sampleData = [
    { id: '1', nombre: 'Centro' },
    { id: '2', nombre: 'Norte' }
  ];
  const filePath = path.join(__dirname, '..', 'data', 'colonias.json');

  beforeEach(() => {
    // Cada lectura devuelve nuestro JSON
    fs.readFileSync.mockReturnValue(JSON.stringify(sampleData));
    fs.writeFileSync.mockClear();
  });

  test('listarColonias → happy path', () => {
    const result = listarColonias();
    expect(fs.readFileSync).toHaveBeenCalledWith(filePath, 'utf8');
    expect(result).toEqual(sampleData);
  });

  test('listarColonias → empty path', () => {
    fs.readFileSync.mockReturnValue('[]');
    expect(listarColonias()).toEqual([]);
  });

  describe('recuperarPorId', () => {
    test('happy path', () => {
      const res = recuperarPorId('2');
      expect(res).toEqual(sampleData[1]);
    });
    test('sin id lanza Error', () => {
      expect(() => recuperarPorId()).toThrow('ID no proporcionado');
    });
    test('id inexistente devuelve undefined', () => {
      fs.readFileSync.mockReturnValue('[]');
      expect(recuperarPorId('99')).toBeUndefined();
    });
  });

  describe('crearColonia', () => {
    test('happy path asigna id y escribe fichero', () => {
      // maxId = 2 → nuevo id = '3'
      const nueva = { nombre: 'Sur' };
      const creado = crearColonia(nueva);
      expect(creado).toMatchObject({ id: '3', nombre: 'Sur' });
      expect(fs.writeFileSync).toHaveBeenCalled();
    });
    test('sin colonia lanza Error', () => {
      expect(() => crearColonia()).toThrow('Colonia no proporcionada');
    });
  });

  describe('actualizarColonia', () => {
    test('happy path modifica y escribe fichero', () => {
      const upd = { id: '1', nombre: 'CentroMod' };
      const result = actualizarColonia(upd);
      expect(result).toMatchObject({ id: '1', nombre: 'CentroMod' });
      expect(fs.writeFileSync).toHaveBeenCalled();
    });
    test('sin id lanza Error', () => {
      expect(() => actualizarColonia({})).toThrow('ID no proporcionado');
    });
    test('id no existe lanza Error', () => {
      expect(() => actualizarColonia({ id: '99', nombre: 'X' }))
        .toThrow('Colonia no encontrada');
    });
  });

  describe('eliminarColonia', () => {
    test('happy path filtra y escribe fichero', () => {
      const result = eliminarColonia('1');
      expect(result).toBe(true);
      expect(fs.writeFileSync).toHaveBeenCalled();
    });
    test('sin id lanza Error', () => {
      expect(() => eliminarColonia()).toThrow('ID no proporcionado');
    });
  });
});
