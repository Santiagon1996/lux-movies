export const API_BASE_URL =
    process.env.NODE_ENV === "development"
        ? ""       // rutas relativas, proxy de Vite maneja el redireccionamiento
        : "/api";  // en producción, Express sirve frontend + API
