import React from 'react';
import type { Movie } from '../../types/Movie';

interface MovieImageProps {
    movie: Movie;
}

const MovieImage: React.FC<MovieImageProps> = ({ movie }) => {
    return (
        <div style={{ width: '100%', maxWidth: 320, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ borderRadius: 16, boxShadow: '0 2px 12px #0003', width: '100%', height: 'auto', maxHeight: 420, objectFit: 'cover', marginBottom: 24 }}
            />
        </div>
    );
};

export default MovieImage;
