
import type { Request, Response } from "express";
import {
    BaseError,
    httpStatusByErrorType,
    ErrorType,
    JsonParseError,
} from '../../shared/errors/errors';

export function errorHandler(
    error: unknown,
    _req: Request,
    res: Response
) {
    // 1. Si es un error de nuestra app (incluye JsonParseError lanzados manualmente)
    if (error instanceof BaseError) {
        const statusCode = httpStatusByErrorType[error.type] ?? 500;
        return res.status(statusCode).json({
            error: error.publicMessage,
            details: error.details,
            type: error.type,
        });
    }

    // 2.  DETECTAR Y CONVERTIR ERRORES NATIVOS DE JSON PARSING
    if (
        error instanceof Error &&
        (error.name === 'SyntaxError' || error.message.includes('JSON')) &&
        (error.message.includes('Unexpected token') ||
            error.message.includes('Expected') ||
            error.message.includes('not valid JSON'))
    ) {
        const jsonParseError = new JsonParseError(
            'JSON malformado - revise la sintaxis',
            { originalError: error.message },
            'Failed to parse request body as JSON'
        );
        const statusCode = httpStatusByErrorType[jsonParseError.type] ?? 400;
        return res.status(statusCode).json({
            error: jsonParseError.publicMessage,
            details: jsonParseError.details,
            type: jsonParseError.type,
        });
    }

    // 3. Si es un error nativo de JavaScript
    if (error instanceof Error) {
        return res.status(httpStatusByErrorType[ErrorType.SYSTEM]).json({
            error: error.message || 'Error desconocido',
            type: ErrorType.SYSTEM,
        });
    }

    // 4. Caso final: error desconocido que no es Error
    return res.status(httpStatusByErrorType[ErrorType.SYSTEM]).json({
        error: 'Error interno del servidor',
        type: ErrorType.SYSTEM,
    });
}
/**
 * 🧠 EXPLICACIÓN DEL HANDLER DE ERRORES CON TYPESCRIPT Y NEXT.JS
 *
 * 1- Importación de tipos y errores personalizados:  
 *    → Se importan clases de error personalizadas desde `@shared/errors/error` para discriminarlos.
 *
 * 2- Manejo de errores específicos:
 *    - Si el error es una instancia de `BaseError`, se obtiene el código HTTP correspondiente del mapa `httpStatusByErrorType`.
 *    - Se retorna una respuesta JSON con el mensaje público, detalles y tipo del error.
 *
 * 3- Manejo de errores de validación:
 *    - Si el error es una instancia de `ZodError`, se retorna un mensaje específico de validación con los detalles de los problemas encontrados.
 *
 * 4- Manejo de errores nativos:
 *    - Si el error es una instancia de `Error`, se retorna un mensaje genérico del sistema.
 *
 * 5- Manejo de errores desconocidos:
 *    - Si el error no es una instancia de `Error`, se retorna un mensaje genérico indicando un error interno del servidor.
 */