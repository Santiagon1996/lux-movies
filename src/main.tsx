// src/main.tsx
import { QueryClient, QueryClientProvider, hydrate } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import AppWrapper from './AppWrapper';
import dotenv from 'dotenv';

dotenv.config();

const queryClient = new QueryClient();

// 1. Recupera el estado deshidratado que fue enviado desde el servidor.
const dehydratedState = (window as unknown as { __REACT_QUERY_STATE__?: unknown }).__REACT_QUERY_STATE__;

// 2. Hidrata el QueryClient del lado del cliente con los datos pre-cargados.
if (dehydratedState) {
  hydrate(queryClient, dehydratedState);
}

// 3. Obtiene el contenedor raíz de la aplicación.
const container = document.getElementById('root');

if (container) {
  const app = (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppWrapper />
        {/* Herramientas de desarrollo para depurar las queries */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );

  // 4. Decide si hidratar o renderizar desde cero.
  // hydrateRoot: Se usa para SSR. Adjunta los eventos al HTML existente.
  // createRoot: Se usa para CSR (Client-Side Rendering) cuando no hay HTML previo.
  if (container.hasChildNodes()) {
    hydrateRoot(container, app);
  } else {
    createRoot(container).render(app);
  }
}