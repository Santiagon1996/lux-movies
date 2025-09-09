import { QueryClient, QueryClientProvider, hydrate } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import dotenv from 'dotenv';

dotenv.config();

const queryClient = new QueryClient();

// Recuperar estado prefetched del server
const dehydratedState = (window as unknown as { __REACT_QUERY_STATE__?: unknown }).__REACT_QUERY_STATE__;

// Hidratar el estado en QueryClient
hydrate(queryClient, dehydratedState);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* Devtools para debuggear queries */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
