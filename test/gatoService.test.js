jest.mock('../repositories/gatoRepository');
const repo = require('../repositories/gatoRepository');

const {
  listarGatosActivos,
  recuperarPorId,
  crearNuevoGato,
  actualizarDatosGato,
  eliminarRegistroGato
} = require('../services/gatoService');

describe('gatoService', () => {
  afterEach(() => jest.clearAllMocks());

  describe('listarGatosActivos', () => {
    test('happy path: añade estadoSalud y ordena GRAVE→REGULAR→SANO', () => {
      const data = [
        { id:1, nombre:'A', edad:4, peso:4,   vacunado:true,  cer:true,  enfermedades:[]    , fechaBorrado:null }, // ratio 1.0 → SANO
        { id:2, nombre:'B', edad:3, peso:2,   vacunado:false, cer:true,  enfermedades:[]    , fechaBorrado:null }, // not vacunado → REGULAR
        { id:3, nombre:'C', edad:2, peso:1,   vacunado:false, cer:false, enfermedades:['virus'], fechaBorrado:null }, // enfermedades → GRAVE
      ];
      repo.getAllGatos.mockReturnValue(data);

      const result = listarGatosActivos();

      // Debe filtrar sólo fechaBorrado===null
      expect(result.every(g => g.fechaBorrado === null)).toBe(true);
      // Debe añadir estadoSalud
      expect(result.map(g => g.estadoSalud)).toEqual(['GRAVE','REGULAR','SANO']);
      // Debe ordenar GRAVE primero
      expect(result[0].estadoSalud).toBe('GRAVE');
    });

    test('empty path: sin gatos devuelve []', () => {
      repo.getAllGatos.mockReturnValue([]);
      expect(listarGatosActivos()).toEqual([]);
    });
  });

  describe('recuperarPorId', () => {
    test('happy path añade estadoSalud', () => {
      const g = { id:1, nombre:'X', edad:2, peso:1, vacunado:true,cer:true,enfermedades:[], fechaBorrado:null };
      repo.getAllGatos.mockReturnValue([g]);
      const res = recuperarPorId(1);
      expect(res).toHaveProperty('estadoSalud','SANO');
    });
    test('sin id lanza Error', () => {
      expect(() => recuperarPorId()).toThrow('ID no proporcionado');
    });
  });

  describe('crearNuevoGato', () => {
    test('happy path llama a createGato y devuelve con estadoSalud', () => {
      const newG = { nombre:'Z', edad:1, peso:1, vacunado:true,cer:true,enfermedades:[] };
      repo.createGato.mockReturnValue({ id:5, ...newG, fechaBorrado:null });
      const res = crearNuevoGato(newG);
      expect(repo.createGato).toHaveBeenCalledWith(newG);
      expect(res).toHaveProperty('estadoSalud','SANO');
    });
    test('sin datos lanza Error', () => {
      expect(() => crearNuevoGato()).toThrow('Datos del gato incompletos');
    });
  });

  describe('actualizarDatosGato', () => {
    test('happy path llama a updateGato y devuelve con estadoSalud', () => {
      const upd = { id:2, nombre:'B2', edad:3, peso:2, vacunado:true,cer:true,enfermedades:[] };
      repo.updateGato.mockReturnValue(upd);
      const res = actualizarDatosGato(upd);
      expect(repo.updateGato).toHaveBeenCalledWith(upd);
      expect(res).toHaveProperty('estadoSalud');
    });
    test('sin id lanza Error', () => {
      expect(() => actualizarDatosGato({ nombre:'x' })).toThrow('Gato o ID no proporcionado');
    });
  });

  describe('eliminarRegistroGato', () => {
    test('happy path llama a deleteGato y devuelve con estadoSalud', () => {
      const del = { id:3, fechaBorrado:'2025-05-01', vacunado:true,cer:true,enfermedades:[] };
      repo.deleteGato.mockReturnValue(del);
      const res = eliminarRegistroGato(3);
      expect(repo.deleteGato).toHaveBeenCalledWith(3);
      expect(res).toHaveProperty('estadoSalud');
    });
    test('sin id lanza Error', () => {
      expect(() => eliminarRegistroGato()).toThrow('ID no proporcionado');
    });
  });
});