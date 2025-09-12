import type { Request, Response } from "express";

export const expressErrorHandler = (err: Error, _req: Request, res: Response) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
};
