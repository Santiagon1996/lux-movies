import React from "react";
import { useParams } from "react-router-dom";
import { useMovieById } from "../../hooks/useMovieById";
import MovieImage from "../atoms/MovieImage";
import Sinopsis from "../atoms/Sinopsis";
import ButtonWish from "../atoms/ButtonWish";
const MovieDetail: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();

    const idNumber = Number(movieId);

    const { data: movie, isLoading, isError, error } = useMovieById(idNumber);

    if (isLoading) {
        return <div className="p-4 text-center">Cargando detalles de la película...</div>;
    }

    if (isError) {
        return <div className="p-4 text-center text-red-500">Error: {error?.message}</div>;
    }

    if (!movie) {
        return <div className="p-4 text-center">Película no encontrada.</div>;
    }

    return (
        <div className="movie-detail-container">
            <h1 className="movie-detail-title">{movie.title}</h1>
            <div className="movie-detail-grid">
                <MovieImage movie={movie} />
                <div className="movie-detail-right-col">
                    <Sinopsis text={movie.overview} />
                    <ButtonWish movie={movie} />
                </div>
            </div>
            <div className="movie-detail-info">
                <strong>Estreno:</strong> {movie.release_date} &nbsp;|&nbsp; <strong>Popularidad:</strong> {movie.popularity} &nbsp;|&nbsp; <strong>Rating:</strong> {movie.vote_average} ({movie.vote_count} votos)
            </div>
        </div>
    );
};

export default MovieDetail;
