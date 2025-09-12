import { renderToString } from "react-dom/server";
import AppWrapper from "./AppWrapper";
import { QueryClient, QueryClientProvider, dehydrate } from "@tanstack/react-query";
import type { DehydratedState } from "@tanstack/react-query";
import { apiClient } from "./utils/apiClient";
import type { Movie } from "./app/types/Movie";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import wishListReducer from "./app/store/wishListSlice";

// Definir tipos de respuesta de la API
interface MoviesByCategoryResponse {
    result: Movie[];
}

interface MovieByIdResponse {
    result: Movie;
}

type RenderResult = {
    appHtml: string;
    dehydratedState: DehydratedState;
    preloadedState: unknown;
};
export async function render(url: string): Promise<RenderResult> {
    // Crear QueryClient (para TanStack Query)
    const queryClient = new QueryClient();
    // Crear Redux Store
    const store = configureStore({
        reducer: {
            wishList: wishListReducer,
        },
    });

    // Extraer categoría o ID de película de la URL
    const categoryMatch = url.match(/\/category\/(\w+)/);
    const movieIdMatch = url.match(/\/movie\/(\w+)/);


    // Prefetch de datos según la URL
    if (categoryMatch) {
        const category = categoryMatch[1];
        await queryClient.prefetchQuery({
            queryKey: ["movies", category],
            queryFn: () => apiClient<MoviesByCategoryResponse>(`/api/category/${category}`),
        });
    } else if (movieIdMatch) {
        const movieId = movieIdMatch[1];
        await queryClient.prefetchQuery({
            queryKey: ["movie", movieId],
            queryFn: () => apiClient<MovieByIdResponse>(`/api/id/${movieId}`),
        });
    }

    // Serializar el estado
    const dehydratedState = dehydrate(queryClient);

    // Obtener el estado pre-cargado de Redux
    const preloadedState = store.getState();

    // Render SSR
    const appHtml = renderToString(
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <AppWrapper url={url} />
            </QueryClientProvider>
        </Provider>
    );

    return { appHtml, dehydratedState, preloadedState };
}
