import { fetchMoviesByCategory } from '../logic/fetchMovieByCategory';
// import { errors } from '../../shared/errors/errors';

// const { ValidationError, UnauthorizedError, SystemError, NotFoundError, JsonParseError } = errors;

describe('fetchMoviesByCategory', () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };
    });
    afterAll(() => {
        process.env = OLD_ENV;
    });

    it('debería retornar resultados válidos (happy path)', async () => {
        process.env.API_KEY = 'test_key';
        process.env.BASE_URL = 'https://api.mock';
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({ results: [{ id: 1, title: 'Test Movie' }] })
        });
        const results = await fetchMoviesByCategory('action');
        expect(Array.isArray(results)).toBe(true);
        expect(results[0].title).toBe('Test Movie');
    });

    it('debería lanzar ValidationError si la categoría es inválida', async () => {
        process.env.API_KEY = 'test_key';
        process.env.BASE_URL = 'https://api.mock';
        await expect(fetchMoviesByCategory('')).rejects.toMatchObject({
            publicMessage: 'La categoría es requerida y debe ser un string.',
            internalMessage: 'fetchMoviesByCategory: parámetro category inválido',
            details: { category: '' }
        });
    });

    it('debería lanzar UnauthorizedError si falta la API Key', async () => {
        process.env.API_KEY = '';
        process.env.BASE_URL = 'https://api.mock';
        await expect(fetchMoviesByCategory('action')).rejects.toMatchObject({
            publicMessage: 'No autorizado. Falta API Key.',
            internalMessage: 'fetchMoviesByCategory: variable de entorno API_KEY ausente',
            details: { apiKey: '' }
        });
    });

    it('debería lanzar SystemError si falta la BASE_URL', async () => {
        process.env.API_KEY = 'test_key';
        process.env.BASE_URL = '';
        await expect(fetchMoviesByCategory('action')).rejects.toMatchObject({
            publicMessage: 'No se ha configurado la URL base de la API.',
            internalMessage: 'fetchMoviesByCategory: variable de entorno BASE_URL ausente',
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
        await expect(fetchMoviesByCategory('unknown')).rejects.toMatchObject({
            publicMessage: 'No se encontró la categoría solicitada.',
            internalMessage: 'fetchMoviesByCategory: la categoría "unknown" no existe en la API',
            details: { category: 'unknown' }
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
        await expect(fetchMoviesByCategory('action')).rejects.toMatchObject({
            publicMessage: 'Error al obtener las películas.',
            internalMessage: 'fetchMoviesByCategory: respuesta no OK (500)',
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
        await expect(fetchMoviesByCategory('action')).rejects.toMatchObject({
            publicMessage: 'Respuesta de la API malformada.',
            internalMessage: 'fetchMoviesByCategory: error al parsear JSON de la respuesta',
            details: { originalError: expect.any(SyntaxError) }
        });
    });

    it('debería lanzar ValidationError si results no es un array', async () => {
        process.env.API_KEY = 'test_key';
        process.env.BASE_URL = 'https://api.mock';
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({ results: null })
        });
        await expect(fetchMoviesByCategory('action')).rejects.toMatchObject({
            publicMessage: 'La respuesta de la API no contiene resultados válidos.',
            internalMessage: 'fetchMoviesByCategory: campo results ausente o inválido en la respuesta',
            details: { data: { results: null } }
        });
    });

    it('debería lanzar SystemError si ocurre un error inesperado', async () => {
        process.env.API_KEY = 'test_key';
        process.env.BASE_URL = 'https://api.mock';
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
        await expect(fetchMoviesByCategory('action')).rejects.toMatchObject({
            publicMessage: 'Error inesperado en fetchMoviesByCategory.',
            internalMessage: 'fetchMoviesByCategory: error no controlado',
            details: { originalError: expect.any(Error) }
        });
    });
});
