import type { Request, Response, NextFunction } from "express";
import { errorHandler } from "./errorHandler";

/**
 * Middleware para manejar errores en controladores Express.
 * 
 * @param callback - Función async que maneja la lógica del endpoint
 * @returns - Middleware Express con manejo de errores centralizado
 */
export const withErrorHandling = (
    callback: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await callback(req, res, next);
        } catch (error) {
            errorHandler(error, req, res, next);
        }
    };
};
