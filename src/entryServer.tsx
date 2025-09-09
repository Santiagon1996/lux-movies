import { renderToString } from "react-dom/server";
import App from "./App";
import { QueryClient, QueryClientProvider, dehydrate } from "@tanstack/react-query";
import type { DehydratedState } from "@tanstack/react-query";
import { apiClient } from "./utils/apiClient";

type RenderResult = {
    appHtml: string;
    dehydratedState: DehydratedState;
};
export async function render(url: string): Promise<RenderResult> {
    // Crear QueryClient
    const queryClient = new QueryClient();

    // Extraer categoría de la URL, fallback a "action"
    const categoryMatch = url.match(/\/category\/(\w+)/);
    const category = categoryMatch ? categoryMatch[1] : "action";

    // Prefetch de datos (ejemplo: categoría "action")
    await queryClient.prefetchQuery({
        queryKey: ["movies", category],
        queryFn: () => apiClient(`/api/category/${category}`),
    });

    // Serializar el estado
    const dehydratedState = dehydrate(queryClient);

    // Render SSR
    const appHtml = renderToString(
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    );

    return { appHtml, dehydratedState };
}
