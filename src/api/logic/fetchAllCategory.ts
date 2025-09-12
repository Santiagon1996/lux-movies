import { errors } from '../../shared/errors/errors';

const { ValidationError, UnauthorizedError, SystemError, NotFoundError, JsonParseError } = errors;

export const fetchAllCategory = async () => {
    const apiToken = process.env.API_TOKEN;
    const BASE_URL = process.env.BASE_URL;
    try {
        if (!apiToken) {
            throw new UnauthorizedError(
                'No autorizado. Falta API Token.',
                { apiToken },
                'fetchAllCategory: variable de entorno API_TOKEN ausente'
            );
        }
        if (!BASE_URL) {
            throw new SystemError(
                'No se ha configurado la URL base de la API.',
                { BASE_URL },
                'fetchAllCategory: variable de entorno BASE_URL ausente'
            );
        }

        // Fetch de categorías
        const response = await fetch(`${BASE_URL}/genre/movie/list`, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
                "Content-Type": "application/json",
            },
        });
        if (response.status === 404) {
            throw new NotFoundError(
                'No se encontraron categorías.',
                {},
                'fetchAllCategory: endpoint de categorías no encontrado'
            );
        }
        if (!response.ok) {
            throw new SystemError(
                'Error al obtener las categorías.',
                { status: response.status, statusText: response.statusText },
                `fetchAllCategory: respuesta no OK (${response.status})`
            );
        }

        let data;
        try {
            data = await response.json();
        } catch (err) {
            throw new JsonParseError(
                'Respuesta de la API malformada.',
                { originalError: err },
                'fetchAllCategory: error al parsear JSON de la respuesta'
            );
        }

        if (!data.genres || !Array.isArray(data.genres)) {
            throw new ValidationError(
                'La respuesta de la API no contiene géneros válidos.',
                { data },
                'fetchAllCategory: campo genres ausente o inválido en la respuesta'
            );
        }

        return data.genres;
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
            'Error inesperado en fetchAllCategory.',
            { originalError: error },
            'fetchAllCategory: error no controlado'
        );
    }
};
