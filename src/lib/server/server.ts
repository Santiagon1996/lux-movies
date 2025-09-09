import dotenv from 'dotenv';
import fs from "node:fs/promises";
import express from "express";
import { createServer as createViteServer } from "vite";
import { movieRouter } from '../../api/routes/movie';
dotenv.config();

async function createServer() {
    const app = express();

    // Middleware para registrar las solicitudes entrantes
    app.use((req, _res, next) => {
        console.log(`[${req.method}] ${req.url}`);
        next();
    });

    // 1. Maneja las rutas de la API primero.
    app.use('/api', movieRouter);

    // 2. Luego, usa el middleware de Vite para el entorno de desarrollo.
    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "custom",
    });
    app.use(vite.middlewares);

    // 3. Define la ruta comodín para el SSR al final, después de Vite.
    app.use(async (req, res, next) => {
        const url = req.originalUrl;

        try {
            // Lógica de SSR
            let template = await fs.readFile("./index.html", "utf-8");
            template = await vite.transformIndexHtml(url, template);
            const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
            const appHtml = await render(url);
            const html = template.replace(``, appHtml);
            res.status(200).set({ "Content-Type": "text/html" }).end(html);
        } catch (e) {
            // Aquí solo necesitamos manejar los errores de SSR
            vite.ssrFixStacktrace(e as Error);
            next(e);
        }
    });

    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
}

createServer();