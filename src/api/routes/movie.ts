import { Router } from "express";
import { logic } from "../logic/index";
import { createRouteHandler } from "../handlers/index"

const { fetchMoviesByCategory, fetchMovieById } = logic;

export const movieRouter = Router();

// Rutas 
movieRouter.get("/category/:category", createRouteHandler(fetchMoviesByCategory, "category"));
movieRouter.get("/id/:id", createRouteHandler(fetchMovieById, "id"));
