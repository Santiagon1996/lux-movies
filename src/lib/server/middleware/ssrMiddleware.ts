import type { Request, Response, NextFunction } from "express";
import fs from "node:fs/promises";
import type { ViteDevServer } from "vite";
import { render } from "../../../entryServer";
import { injectSSR } from "./injectSSR";

interface SSRMiddlewareOptions {
    isProd: boolean;
    vite?: ViteDevServer;
}

export function createSSRMiddleware(options: SSRMiddlewareOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const url = req.originalUrl;
            const templatePath = options.isProd ? "dist/client/index.html" : "./index.html";
            let template = await fs.readFile(templatePath, "utf-8");

            if (!options.isProd && options.vite) {
                template = await options.vite.transformIndexHtml(url, template);
                const { render: ssrRender } = await options.vite.ssrLoadModule("/src/entryServer.tsx");
                const { appHtml, dehydratedState } = await ssrRender(url);
                template = injectSSR(template, appHtml, dehydratedState);
            } else {
                const { appHtml, dehydratedState } = await render(url);
                template = injectSSR(template, appHtml, dehydratedState);
            }

            res.status(200).set({ "Content-Type": "text/html" }).end(template);
        } catch (err) {
            next(err);
        }
    };
}
