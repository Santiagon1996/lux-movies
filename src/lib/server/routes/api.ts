import { Router } from "express";
import { movieRouter } from '../../../api/routes/movie';

export const apiRoutes = Router();

apiRoutes.use(movieRouter);
