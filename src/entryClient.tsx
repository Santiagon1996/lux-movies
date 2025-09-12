import { createRoot, hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import wishListReducer from "./app/store/wishListSlice";
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider, hydrate } from '@tanstack/react-query';
import AppWrapper from './AppWrapper';

// Extiende la interfaz Window para incluir los estados deshidratados
declare global {
    interface Window {
        __REACT_QUERY_STATE__?: unknown;
        __REDUX_STATE__?: unknown;
    }
}

// Recupera el estado deshidratado del SSR
const dehydratedState = window.__REACT_QUERY_STATE__;

// Recupera el estado pre-cargado de Redux del SSR
const preloadedState = window.__REDUX_STATE__;

// Configura el store de Redux
const store = configureStore({
    reducer: {
        wishList: wishListReducer,
    },
    preloadedState: preloadedState as unknown,
});

// Configura el QueryClient de TanStack Query
const queryClient = new QueryClient();
// Hidrata el estado deshidratado si existe
if (dehydratedState) {
    hydrate(queryClient, dehydratedState);
}

// Hidrata o crea la aplicación React
const container = document.getElementById('root')!;

//Define la aplicación con los proveedores necesarios
const app = (
    <Provider store={store}>
        <QueryClientProvider client={queryClient} >
            <AppWrapper />
        </QueryClientProvider>
    </Provider>
);

// Usa hydrateRoot para hidratar si ya hay contenido, de lo contrario usa createRoot
if (container.hasChildNodes()) {
    hydrateRoot(container, app);
} else {
    createRoot(container).render(app);
}
