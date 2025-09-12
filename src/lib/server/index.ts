import dotenv from 'dotenv';
import express from "express";
import { createServer as createViteServer } from "vite";
import { requestLogger } from "./middleware/logger";
import { expressErrorHandler } from "./middleware/expressErrorHandler";
import { createSSRMiddleware } from "./middleware/ssrMiddleware";
import { apiRoutes } from "./routes/api";

dotenv.config();

async function createServer() {
    const app = express();
    const isProd = process.env.NODE_ENV === 'production';

    app.use(requestLogger);
    app.use(apiRoutes);

    if (isProd) {
        app.use(express.static("dist/client"));
        app.use(createSSRMiddleware({ isProd: true }));
    } else {
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: "custom",
        });
        app.use(vite.middlewares);
        app.use(createSSRMiddleware({ isProd: false, vite }));
    }

    app.use(expressErrorHandler);

    app.listen(3000, () => console.log("Server running on http://localhost:3000"));
}

createServer();
