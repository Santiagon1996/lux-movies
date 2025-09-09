import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../utils/apiClient";



// Película por ID
export function useMovieById(id: string | number) {
    return useQuery({
        queryKey: ["movie", id],
        queryFn: () => apiClient(`/api/id/${id}`),
    });
}
