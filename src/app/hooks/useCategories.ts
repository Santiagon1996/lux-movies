
import { useQuery } from "@tanstack/react-query";

export interface Category {
    id: number;
    name: string;
}

interface CategoriesResponse {
    result: Category[];
}

export function useCategories() {
    return useQuery<CategoriesResponse>({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await fetch("/api/categories");
            if (!res.ok) throw new Error("Error al obtener categorías");
            return await res.json();
        },
    });
}
