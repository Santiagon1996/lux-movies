import type { Request, Response } from "express";
import { withErrorHandling } from "./index";

// Tipo genérico para funciones de lógica
export type LogicFn<T> = (param: string) => Promise<T>;

// Función genérica para crear un handler de ruta
export const createRouteHandler = <T>(logicFn: LogicFn<T>, paramName: string) =>
    withErrorHandling(async (req: Request, res: Response) => {
        const paramValue = req.params[paramName];
        const data = await logicFn(paramValue);
        return res.json({ result: data });
    });
