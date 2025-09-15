
import React from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../../types/Movie';

interface MovieCardProps {
    movie: Movie;
    category: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, category }) => {
    return (
        <Link to={`/movie/${movie.id}?category=${category}`} style={{ textDecoration: 'none' }}>
            <div className="movie-detail-card">
                <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/180x270?text=Sin+Imagen'}
                    alt={movie.title}
                    className="movie-detail-poster"
                />
                <div className="movie-detail-info">
                    <div className="movie-detail-title">{movie.title}</div>
                    <div className="movie-detail-details">{movie.release_date}</div>
                    <div className="movie-detail-meta">Popularity: {movie.popularity}</div>
                    <div className="movie-detail-meta">Vote: {movie.vote_average}</div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
