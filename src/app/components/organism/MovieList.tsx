import React from 'react';
import { useMoviesByCategory } from '../../hooks/useMovieByCategory';
import type { Movie } from "../../types/Movie";
import MovieCard from '../molecules/MovieCard';

interface MoviesListProps {
    category: string;
}

const MovieList: React.FC<MoviesListProps> = ({ category }) => {
    const { data, isLoading, isError, error } = useMoviesByCategory(category);

    // Estilos CSS para el carrusel
    const carouselStyles: React.CSSProperties = {
        display: 'flex',
        overflowX: 'scroll',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        gap: '1rem', // Espacio entre las tarjetas
        padding: '1rem',
    };



    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full text-lg">
                Cargando películas...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-red-500 text-center text-lg">
                Error al cargar las películas: {error.message}
            </div>
        );
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 capitalize">
                {category.replace('_', ' ')}
            </h2>
            <div style={carouselStyles}>
                {data?.map((movie: Movie) => (
                    <div key={movie.id}>
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
