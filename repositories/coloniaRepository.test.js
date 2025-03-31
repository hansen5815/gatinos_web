const axios = require('axios');
jest.mock('axios');
const mockGet = jest.fn();
const mockPost = jest.fn();
const mockPut = jest.fn();
const mockDelete = jest.fn();

axios.create.mockReturnValue({
    get: mockGet,
    post: mockPost,
    put: mockPut,
    delete: mockDelete,
});
const coloniaRepository = require('./coloniaRepository');
const mockColonia = require('../data/colonia.json');

describe('Colonia Repository', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Recuperar colonia por id', async () => {
        mockGet.mockReturnValue({
            data: mockColonia,
        });
        const resultado = await coloniaRepository.recuperarPorId(1);
        expect(resultado).toEqual(mockColonia);
        expect(mockGet).toHaveBeenCalledWith('/colonias/1');
    })
    });