import React from 'react';
import { useMoviesByCategory } from '../../hooks/useMovieByCategory';
import type { Movie } from "../../types/Movie";
import MovieCard from '../molecules/MovieCard';

interface MoviesListProps {
    category: string;
}

const MovieList: React.FC<MoviesListProps> = ({ category }) => {
    const { data, isLoading, isError, error } = useMoviesByCategory(category);

    const carouselRef = React.useRef<HTMLDivElement>(null);

    const scrollCarousel = (direction: 'left' | 'right') => {
        const el = carouselRef.current;
        if (el) {
            const scrollAmount = el.offsetWidth * 0.8;
            el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };



    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full text-lg">
                Loading movies...            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-red-500 text-center text-lg">
                Error loading movies: {error.message}
            </div>
        );
    }

    return (
        <div className="p-4" style={{ position: 'relative' }}>
            <button
                className="carousel-nav-btn left"
                onClick={() => scrollCarousel('left')}
                aria-label="Desplazar a la izquierda"
            >
                &#8592;
            </button>
            <button
                className="carousel-nav-btn right"
                onClick={() => scrollCarousel('right')}
                aria-label="Desplazar a la derecha"
            >
                &#8594;
            </button>
            <div ref={carouselRef} className="carousel-container">
                {data?.map((movie: Movie) => (
                    <div key={movie.id} className="carousel-card">
                        <MovieCard movie={movie} category={category} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
