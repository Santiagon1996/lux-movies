
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../utils/apiClient";
import type { Movie } from "../types/Movie";
interface MoviesByCategoryResponse {
    result: Movie[];
}

export function useMoviesByCategory(category: string) {
    return useQuery<MoviesByCategoryResponse, Error, Movie[]>({
        queryKey: ["movies", category],
        queryFn: () => apiClient<MoviesByCategoryResponse>(`/api/category/${category}`),
        select: (data) => data.result,
    });
}
