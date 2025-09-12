
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../utils/apiClient";
import type { Movie } from "../types/Movie";

interface MovieByIdResponse {
    result: Movie;
}

export function useMovieById(movieId: string | number) {
    return useQuery<MovieByIdResponse, Error, Movie>({
        queryKey: ["movie", movieId],
        queryFn: () => apiClient<MovieByIdResponse>(`/api/id/${movieId}`),
        enabled: !!movieId,
        select: (data) => data.result,
    });
}
