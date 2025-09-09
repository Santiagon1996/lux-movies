
import {
    errors
} from '../../shared/errors/errors';

const { ValidationError, UnauthorizedError, SystemError, NotFoundError, JsonParseError } = errors


export const fetchMovieById = async (movieId: string) => {
    const apiToken = process.env.API_TOKEN;
    const BASE_URL = process.env.BASE_URL;
    try {
        // Validaciones previas
        if (!movieId || typeof movieId !== 'string') {
            throw new ValidationError(
                'El ID de la película es requerido y debe ser un string.',
                { movieId },
                'fetchMovieById: parámetro movieId inválido'
            );
        }
        if (!apiToken) {
            throw new UnauthorizedError(
                'No autorizado. Falta API Token.',
                { apiToken },
                'fetchMovieById: variable de entorno API_TOKEN ausente'
            );
        }
        if (!BASE_URL) {
            throw new SystemError(
                'No se ha configurado la URL base de la API.',
                { BASE_URL },
                'fetchMovieById: variable de entorno BASE_URL ausente'
            );
        }

        // Fetch y validaciones de respuesta
        const response = await fetch(`${BASE_URL}/movie/${movieId}`, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 404) {
            throw new NotFoundError(
                'No se encontró la película solicitada.',
                { movieId },
                `fetchMovieById: el ID "${movieId}" no existe en la API`
            );
        }
        if (!response.ok) {
            throw new SystemError(
                'Error al obtener los detalles de la película.',
                { status: response.status, statusText: response.statusText },
                `fetchMovieById: respuesta no OK (${response.status})`
            );
        }

        let data;
        try {
            data = await response.json();
        } catch (err) {
            throw new JsonParseError(
                'Respuesta de la API malformada.',
                { originalError: err },
                'fetchMovieById: error al parsear JSON de la respuesta'
            );
        }

        if (!data || typeof data !== 'object') {
            throw new ValidationError(
                'La respuesta de la API no contiene datos válidos de la película.',
                { data },
                'fetchMovieById: datos de película ausentes o inválidos en la respuesta'
            );
        }

        return data;
    } catch (error) {
        if (
            error instanceof ValidationError ||
            error instanceof NotFoundError ||
            error instanceof SystemError ||
            error instanceof JsonParseError ||
            error instanceof UnauthorizedError
        ) {
            throw error;
        }
        throw new SystemError(
            'Error inesperado en fetchMovieById.',
            { originalError: error },
            'fetchMovieById: error no controlado'
        );
    }
};