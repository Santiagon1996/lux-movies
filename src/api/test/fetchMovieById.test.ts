import { fetchMovieById } from '../logic/fetchMovieById';
// import { errors } from '../../shared/errors/errors';

// const { ValidationError, UnauthorizedError, SystemError, NotFoundError, JsonParseError } = errors;

describe('fetchMovieById', () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };
    });
    afterAll(() => {
        process.env = OLD_ENV;
    });

    it('debería retornar datos válidos (happy path)', async () => {
        process.env.API_KEY = 'test_key';
        process.env.BASE_URL = 'https://api.mock';
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({ id: 1, title: 'Test Movie' })
        });
        const result = await fetchMovieById('1');
        expect(result).toHaveProperty('title', 'Test Movie');
    });

    it('debería lanzar ValidationError si el id es inválido', async () => {
        process.env.API_KEY = 'test_key';
        process.env.BASE_URL = 'https://api.mock';
        await expect(fetchMovieById('')).rejects.toMatchObject({
            publicMessage: 'El ID de la película es requerido y debe ser un string.',
            internalMessage: 'fetchMovieById: parámetro movieId inválido',
            details: { movieId: '' }
        });
        await expect(fetchMovieById(undefined as unknown as string)).rejects.toMatchObject({
            publicMessage: 'El ID de la película es requerido y debe ser un string.',
            internalMessage: 'fetchMovieById: parámetro movieId inválido',
            details: { movieId: undefined }
        });
    });

    it('debería lanzar UnauthorizedError si falta la API Key', async () => {
        process.env.API_KEY = '';
        process.env.BASE_URL = 'https://api.mock';
        await expect(fetchMovieById('1')).rejects.toMatchObject({
            publicMessage: 'No autorizado. Falta API Key.',
            internalMessage: 'fetchMovieById: variable de entorno API_KEY ausente',
            details: { apiKey: '' }
        });
    });

    it('debería lanzar SystemError si falta la BASE_URL', async () => {
        process.env.API_KEY = 'test_key';
        process.env.BASE_URL = '';
        await expect(fetchMovieById('1')).rejects.toMatchObject({
            publicMessage: 'No se ha configurado la URL base de la API.',
            internalMessage: 'fetchMovieById: variable de entorno BASE_URL ausente',
            details: { BASE_URL: '' }
        });
    });

    it('debería lanzar NotFoundError si la API responde 404', async () => {
        process.env.API_KEY = 'test_key';
        process.env.BASE_URL = 'https://api.mock';
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 404,
            statusText: 'Not Found',
            json: async () => ({})
        });
        await expect(fetchMovieById('999')).rejects.toMatchObject({
            publicMessage: 'No se encontró la película solicitada.',
            internalMessage: 'fetchMovieById: el ID "999" no existe en la API',
            details: { movieId: '999' }
        });
    });

    it('debería lanzar SystemError si la API responde con error distinto de 404', async () => {
        process.env.API_KEY = 'test_key';
        process.env.BASE_URL = 'https://api.mock';
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error',
            json: async () => ({})
        });
        await expect(fetchMovieById('1')).rejects.toMatchObject({
            publicMessage: 'Error al obtener los detalles de la película.',
            internalMessage: 'fetchMovieById: respuesta no OK (500)',
            details: { status: 500, statusText: 'Internal Server Error' }
        });
    });

    it('debería lanzar JsonParseError si la respuesta no es JSON válido', async () => {
        process.env.API_KEY = 'test_key';
        process.env.BASE_URL = 'https://api.mock';
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => { throw new SyntaxError('Unexpected token'); }
        });
        await expect(fetchMovieById('1')).rejects.toMatchObject({
            publicMessage: 'Respuesta de la API malformada.',
            internalMessage: 'fetchMovieById: error al parsear JSON de la respuesta',
            details: { originalError: expect.any(SyntaxError) }
        });
    });

    it('debería lanzar ValidationError si los datos no son válidos', async () => {
        process.env.API_KEY = 'test_key';
        process.env.BASE_URL = 'https://api.mock';
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => null
        });
        await expect(fetchMovieById('1')).rejects.toMatchObject({
            publicMessage: 'La respuesta de la API no contiene datos válidos de la película.',
            internalMessage: 'fetchMovieById: datos de película ausentes o inválidos en la respuesta',
            details: { data: null }
        });
    });

    it('debería lanzar SystemError si ocurre un error inesperado', async () => {
        process.env.API_KEY = 'test_key';
        process.env.BASE_URL = 'https://api.mock';
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
        await expect(fetchMovieById('1')).rejects.toMatchObject({
            publicMessage: 'Error inesperado en fetchMovieById.',
            internalMessage: 'fetchMovieById: error no controlado',
            details: { originalError: expect.any(Error) }
        });
    });
});
