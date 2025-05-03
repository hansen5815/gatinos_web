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
  afterEach(() => jest.resetAllMocks());

  describe('listarGatosActivos', () => {
    test('happy path: filtra, añade estadoSalud y ordena GRAVE→REGULAR→SANO', () => {
      const data = [
        { id:1, nombre:'A', edad:4, peso:4,   vacunado:true,  cer:true,  enfermedades:[]    , fechaBorrado:null },
        { id:2, nombre:'B', edad:3, peso:2,   vacunado:false, cer:true,  enfermedades:[]    , fechaBorrado:null },
        { id:3, nombre:'C', edad:2, peso:1,   vacunado:false, cer:false, enfermedades:['x'], fechaBorrado:null },
        { id:4, nombre:'D', edad:5, peso:5,   vacunado:true,  cer:true,  enfermedades:[]    , fechaBorrado:'2025-01-01' }
      ];
      repo.getAllGatos.mockReturnValue(data);

      const result = listarGatosActivos();

      // Solo los con fechaBorrado === null
      expect(result.map(g => g.id)).toEqual([3,2,1]);
      // Estados en orden GRAVE, REGULAR, SANO
      expect(result.map(g => g.estadoSalud)).toEqual(['GRAVE','REGULAR','SANO']);
    });

    test('empty path: devuelve [] si no hay gatos', () => {
      repo.getAllGatos.mockReturnValue([]);
      expect(listarGatosActivos()).toEqual([]);
    });
  });

  describe('recuperarPorId', () => {
    test('happy path: devuelve gato con estadoSalud', () => {
      const g = { id:10, nombre:'X', edad:2, peso:1, vacunado:true,cer:true,enfermedades:[], fechaBorrado:null };
      repo.getAllGatos.mockReturnValue([g]);
      const res = recuperarPorId(10);
      expect(res).toMatchObject({ id:10, estadoSalud:'SANO' });
    });

    test('sin id: lanza error', () => {
      expect(() => recuperarPorId()).toThrow('ID no proporcionado');
    });

    test('id inexistente: lanza error', () => {
      repo.getAllGatos.mockReturnValue([]);
      expect(() => recuperarPorId(999)).toThrow('Gato no encontrado');
    });
  });

  describe('crearNuevoGato', () => {
    test('happy path: llama a createGato y añade estadoSalud', () => {
      const newG = { nombre:'Z', edad:1, peso:1, vacunado:true,cer:true,enfermedades:[] };
      const created = { id:5, ...newG, fechaBorrado:null };
      repo.createGato.mockReturnValue(created);

      const res = crearNuevoGato(newG);
      expect(repo.createGato).toHaveBeenCalledWith(newG);
      expect(res).toHaveProperty('estadoSalud','SANO');
      expect(res.id).toBe(5);
    });

    test('sin datos: lanza error', () => {
      expect(() => crearNuevoGato()).toThrow('Datos del gato incompletos');
    });
  });

  describe('actualizarDatosGato', () => {
    test('happy path: llama a updateGato y devuelve con estadoSalud', () => {
      const upd = { id:7, nombre:'B2', edad:3, peso:2, vacunado:true,cer:true,enfermedades:[] };
      repo.updateGato.mockReturnValue(upd);

      const res = actualizarDatosGato(upd);
      expect(repo.updateGato).toHaveBeenCalledWith(upd);
      expect(res).toHaveProperty('estadoSalud');
      expect(res.id).toBe(7);
    });

    test('sin id: lanza error', () => {
      expect(() => actualizarDatosGato({ nombre:'x' })).toThrow('Gato o ID no proporcionado');
    });
  });

  describe('eliminarRegistroGato', () => {
    test('happy path: llama a deleteGato y devuelve con estadoSalud', () => {
      const del = { id:3, vacunado:true,cer:true,enfermedades:[], fechaBorrado:'2025-05-01' };
      repo.deleteGato.mockReturnValue(del);

      const res = eliminarRegistroGato(3);
      expect(repo.deleteGato).toHaveBeenCalledWith(3);
      expect(res).toHaveProperty('estadoSalud');
      expect(res.id).toBe(3);
    });

    test('sin id: lanza error', () => {
      expect(() => eliminarRegistroGato()).toThrow('ID no proporcionado');
    });
  });
});
