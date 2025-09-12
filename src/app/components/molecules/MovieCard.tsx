
import React from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../../types/Movie';
// import styles from './MovieCard.module.css';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
            <div className="movie-detail-card">
                <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/180x270?text=Sin+Imagen'}
                    alt={movie.title}
                    className="movie-detail-poster"
                />
                <div className="movie-detail-info">
                    <div className="movie-detail-title">{movie.title}</div>
                    <div className="movie-detail-details">{movie.release_date}</div>
                    <div className="movie-detail-meta">Popularidad: {movie.popularity}</div>
                    <div className="movie-detail-meta">Voto: {movie.vote_average}</div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
