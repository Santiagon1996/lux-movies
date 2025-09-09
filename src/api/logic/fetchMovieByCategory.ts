import {
    errors
} from '../../shared/errors/errors';

const { ValidationError, UnauthorizedError, SystemError, NotFoundError, JsonParseError } = errors


export const fetchMoviesByCategory = async (category: string) => {
    const apiToken = process.env.API_TOKEN;
    const BASE_URL = process.env.BASE_URL;
    try {
        // Validaciones previas
        if (!category || typeof category !== 'string') {
            throw new ValidationError(
                'La categoría es requerida y debe ser un string.',
                { category },
                'fetchMoviesByCategory: parámetro category inválido'
            );
        }
        if (!apiToken) {
            throw new UnauthorizedError(
                'No autorizado. Falta API Token.',
                { apiToken },
                'fetchMoviesByCategory: variable de entorno API_TOKEN ausente'
            );
        }
        if (!BASE_URL) {
            throw new SystemError(
                'No se ha configurado la URL base de la API.',
                { BASE_URL },
                'fetchMoviesByCategory: variable de entorno BASE_URL ausente'
            );
        }

        // Fetch y validaciones de respuesta
        const response = await fetch(`${BASE_URL}/movie/${category}`, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 404) {
            throw new NotFoundError(
                'No se encontró la categoría solicitada.',
                { category },
                `fetchMoviesByCategory: la categoría "${category}" no existe en la API`
            );
        }
        if (!response.ok) {
            throw new SystemError(
                'Error al obtener las películas.',
                { status: response.status, statusText: response.statusText },
                `fetchMoviesByCategory: respuesta no OK (${response.status})`
            );
        }

        let data;
        try {
            data = await response.json();
        } catch (err) {
            throw new JsonParseError(
                'Respuesta de la API malformada.',
                { originalError: err },
                'fetchMoviesByCategory: error al parsear JSON de la respuesta'
            );
        }

        if (!data.results || !Array.isArray(data.results)) {
            throw new ValidationError(
                'La respuesta de la API no contiene resultados válidos.',
                { data },
                'fetchMoviesByCategory: campo results ausente o inválido en la respuesta'
            );
        }

        return data.results;
    } catch (error) {
        // Si ya es un error personalizado, lo relanzamos
        if (error instanceof ValidationError ||
            error instanceof NotFoundError ||
            error instanceof SystemError ||
            error instanceof JsonParseError ||
            error instanceof UnauthorizedError
        ) {
            throw error;
        }
        // Si es otro error, lo envolvemos en SystemError
        throw new SystemError(
            'Error inesperado en fetchMoviesByCategory.',
            { originalError: error },
            'fetchMoviesByCategory: error no controlado'
        );
    }
};