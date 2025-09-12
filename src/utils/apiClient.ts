
export async function apiClient<T>(endpoint: string): Promise<T> {
    const res = await fetch(endpoint);

    // Lanza un error si la respuesta HTTP no es exitosa (por ejemplo, 404, 500)
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({})); // Intenta leer el cuerpo del error
        throw new Error(errorData.error || `Error en la petición: ${res.status}`);
    }

    const json = await res.json();
    return json as T; // Convierte directamente al tipo TT es un componente clave de TypeScript que te ayuda a crear código flexible, seguro y reutilizable, permitiendo que tu función apiClient se adapte a cualquier tipo de dato que necesites obtener de tu API.
}