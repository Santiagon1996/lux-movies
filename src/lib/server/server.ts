import dotenv from 'dotenv';
import fs from "node:fs/promises";
import express from "express";
import { createServer as createViteServer } from "vite";
import { movieRouter } from '../../api/routes/movie';
import { render } from "../../entryServer";

dotenv.config();



async function createServer() {

    const app = express();

    // Middleware para registrar las solicitudes entrantes
    app.use((req, _res, next) => {
        console.log(`[${req.method}] ${req.url}`);
        next();
    });

    // Rutas API
    app.use('/api', movieRouter);



    if (process.env.NODE_ENV === 'production') {
        // Servir build
        app.use(express.static("dist/client"));
        // SSR Middleware
        app.use("*", async (req, res, next) => {
            try {
                const { appHtml, dehydratedState } = await render(req.originalUrl);

                let template = await fs.readFile("dist/client/index.html", "utf-8");

                template = template
                    .replace("<!--ssr-outlet-->", appHtml)
                    .replace(
                        "<!--react-query-state-->",
                        `<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(
                            dehydratedState
                        )}</script>`
                    );

                res.status(200).set({ "Content-Type": "text/html" }).end(template);
            } catch (err) {
                next(err);
            }
        })
    } else {
        // Desarrollo: Vite middleware y SSR dinámico
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: "custom",
        });
        app.use(vite.middlewares);

        app.use(async (req, res, next) => {
            const url = req.originalUrl;
            try {
                let template = await fs.readFile("./index.html", "utf-8");
                template = await vite.transformIndexHtml(url, template);
                const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
                const { appHtml, dehydratedState } = await render(url);
                const html = template.replace("<!--ssr-outlet-->", appHtml)
                    .replace(
                        "<!--react-query-state-->",
                        `<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)}</script>`
                    );
                res.status(200).set({ "Content-Type": "text/html" }).end(html);
            } catch (e) {
                vite.ssrFixStacktrace(e as Error);
                next(e);
            }
        });
    }

    // Middleware de manejo de errores global (debe ir al final)
    app.use((err: Error, _req: express.Request, res: express.Response) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
    });

    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
}

createServer();