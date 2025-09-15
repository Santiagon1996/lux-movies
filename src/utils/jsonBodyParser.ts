import { JsonParseError } from "../shared/errors/errors";
export async function jsonBodyParser<T>(response: Response): Promise<T> {
    try {
        return await response.json();
    } catch (err) {
        throw new JsonParseError(
            "Respuesta de la API malformada.",
            { originalError: err },
            "apiClient: error al parsear JSON"
        );
    }
}

