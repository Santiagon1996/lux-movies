# LuxMovies - Backend SSR con Express + Vite

Este backend implementa un servidor Express preparado para SSR (Server-Side Rendering) con React y Vite, listo para desarrollo y producción.

## ¿Qué logramos aquí?

- **SSR universal**: El servidor puede renderizar la aplicación React tanto en desarrollo (usando Vite middleware) como en producción (usando archivos buildados).
- **Rutas API**: Las rutas `/api` están separadas y gestionadas por Express, permitiendo consumir y exponer datos desde el backend.
- **Manejo de errores**: Se incluye middleware global para capturar y mostrar errores de forma segura.
- **Compatibilidad con Express 5**: El middleware SSR se aplica correctamente usando `app.use(...)` para evitar errores con path-to-regexp.
- **Preparado para React Router**: El SSR soporta rutas dinámicas gracias a `StaticRouter`.
- **Variables de entorno**: Uso de dotenv para cargar configuración sensible desde `.env`.
- **Logs de peticiones**: Se registra cada solicitud entrante para facilitar la depuración.
- **Desarrollo y producción**: El servidor detecta el entorno y ajusta el comportamiento (Vite en dev, archivos estáticos en prod).

## Estructura recomendada

- `src/lib/server/index.ts`: Entrada principal del backend.
- `src/lib/server/middleware/`: Middlewares personalizados (logger, error handler, SSR, etc).
- `src/lib/server/routes/api.ts`: Rutas de la API.
- `src/entryServer.tsx`: Entrada SSR para React.

## ¿Cómo iniciar?

- **Desarrollo:**

  ```sh
  npm run dev:server
  ```

  Accede a `http://localhost:3000`.

- **Producción:**
  ```sh
  npm run build
  NODE_ENV=production node dist/lib/server/index.js
  ```

## Notas

- El SSR está listo para React Router y React Query.
- El backend está preparado para consumir APIs externas usando variables de entorno.
- El middleware SSR puede ser extendido para prefetch de datos y manejo avanzado de rutas.

---

¡Listo para escalar y personalizar según tus necesidades!
