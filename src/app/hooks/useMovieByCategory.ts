import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../utils/apiClient";

// Películas por categoría
export function useMoviesByCategory(category: string) {
    return useQuery({
        queryKey: ["movies", category],
        queryFn: () => apiClient(`/api/category/${category}`),
    });
}
