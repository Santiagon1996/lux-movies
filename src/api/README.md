# LuxMovies API

API para consultar películas por categoría o por ID, con manejo de errores centralizado, lógica desacoplada y pruebas automatizadas.

---

## 📁 Estructura del proyecto

```
api/
├── handlers/       # Middleware de manejo de errores y abstracción de rutas
│   └── index.ts    # Función genérica createRouteHandler y withErrorHandling
├── logic/          # Lógica para consumir la API de películas
│   └── index.ts    # Exporta fetchMoviesByCategory y fetchMovieById
├── routes/         # Definición de rutas de la API
│   └── movie.ts    # Rutas para categoría e ID de películas
├── test/           # Pruebas automatizadas
│   ├── logic.test.ts      # Testeo de funciones de lógica con Jest
│   ├── curl.test.sh       # Scripts Bash para testeo con curl
```

---

## ⚙️ Rutas de la API

### 1. Obtener películas por categoría

```
GET /api/category/:category
```

**Parámetros:**

| Parámetro | Tipo   | Descripción                                                               |
| --------- | ------ | ------------------------------------------------------------------------- |
| category  | string | Categoría de películas: `popular`, `top_rated`, `upcoming`, `now_playing` |

**Respuesta:**

```json
{
  "result": [
    {
      "id": 755898,
      "title": "War of the Worlds",
      "release_date": "2025-07-29",
      "popularity": 615.0872,
      "vote_average": 4.33,
      "vote_count": 495,
      "poster_path": "https://image.tmdb.org/t/p/w500/yvirUYrva23IudARHn3mMGVxWqM.jpg",
      "overview": "Will Radford is a top analyst for Homeland Security..."
    }
  ]
}
```

**Errores posibles:**

| Código | Descripción                      |
| ------ | -------------------------------- |
| 401    | No autorizado. Falta API Token.  |
| 404    | Categoría no encontrada.         |
| 500    | Error inesperado en el servidor. |

---

### 2. Obtener película por ID

```
GET /api/id/:id
```

**Parámetros:**

| Parámetro | Tipo   | Descripción                   |
| --------- | ------ | ----------------------------- |
| id        | string | ID de la película a consultar |

**Respuesta:**

```json
{
  "result": {
    "id": 755898,
    "title": "War of the Worlds",
    "release_date": "2025-07-29",
    "popularity": 615.0872,
    "vote_average": 4.33,
    "vote_count": 495,
    "poster_path": "https://image.tmdb.org/t/p/w500/yvirUYrva23IudARHn3mMGVxWqM.jpg",
    "overview": "Will Radford is a top analyst for Homeland Security..."
  }
}
```

**Errores posibles:**

| Código | Descripción                      |
| ------ | -------------------------------- |
| 401    | No autorizado. Falta API Token.  |
| 404    | Película no encontrada.          |
| 500    | Error inesperado en el servidor. |

---

## 🛠 Middleware y abstracción de rutas

- `withErrorHandling`: Middleware centralizado que captura errores personalizados y responde con JSON.
- `createRouteHandler`: Función genérica que recibe una lógica y el nombre del parámetro, evitando duplicar handlers.

```ts
movieRouter.get(
  "/category/:category",
  createRouteHandler(fetchMoviesByCategory, "category")
);
movieRouter.get("/id/:id", createRouteHandler(fetchMovieById, "id"));
```

---

## 🧩 Lógica de la API

- `fetchMoviesByCategory(category: string)`: Obtiene películas según la categoría.
- `fetchMovieById(movieId: string)`: Obtiene los detalles de una película por ID.

Ambas funciones validan parámetros, manejan errores y parsean la respuesta JSON.

---

## 🧪 Pruebas

### 1. Test con Jest (unitario / lógica)

```bash
npm run test
```

- Ubicación: `api/test/logic.test.ts`
- Testea las funciones de `logic`, asegurando la correcta respuesta de la API y manejo de errores.

### 2. Test con curl (integración / rutas)

```bash
# Obtener todas las películas por categoría
bash api/test/curl.test.sh

# Obtener película por ID
bash api/test/get-id.sh
```

- Scripts Bash permiten validar rutas con colores y formato de salida legible.
- Ubicación: `api/test/`

---

## 🌐 Variables de entorno

- `API_TOKEN`: Token de autenticación para la API de películas.
- `BASE_URL`: URL base de la API remota.

---

## ✅ Notas finales

- Se aplican principios DRY y SOLID mediante la abstracción de rutas y centralización de errores.
- El proyecto está listo para escalar a nuevas rutas o funcionalidades sin duplicar código.
- La combinación de pruebas unitarias y de integración asegura el correcto funcionamiento de la API.
