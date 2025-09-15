import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useMovieById } from "../../hooks/useMovieById";
import MovieImage from "../atoms/MovieImage";
import Sinopsis from "../atoms/Sinopsis";
import ButtonWish from "../atoms/ButtonWish";
import categoryStyles from "../../../utils/categoryStyles";



const MovieDetail: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [searchParams] = useSearchParams();

    const idNumber = Number(movieId);
    const { data: movie, isLoading, isError, error } = useMovieById(idNumber);


    const category = searchParams.get("category") || "popular";
    const styles = categoryStyles[category] || categoryStyles["popular"];



    if (isLoading) {
        return <div className="p-4 text-center">Loading movie details...</div>;
    }

    if (isError) {
        return <div className="p-4 text-center text-red-500">Error: {error?.message}</div>;
    }

    if (!movie) {
        return <div className="p-4 text-center">Movie not found.</div>;
    }

    return (
        <div className="MovieDetail-container">
            <h1 className="MovieDetail-title" style={{ color: styles.color, fontFamily: styles.fontFamily }}>{movie.title}</h1>
            <div className="MovieDetail-grid">
                <MovieImage movie={movie} />
                <div className="MovieDetail-right-col">
                    <Sinopsis text={movie.overview} style={{ color: styles.color, background: styles.background, fontFamily: styles.fontFamily }} />
                    <ButtonWish movie={movie} style={styles.buttonWish} />
                </div>
            </div>
            <div className="MovieDetail-info" style={{ color: styles.color, background: styles.background, fontFamily: styles.fontFamily }}>
                <strong>Release:</strong> {movie.release_date} &nbsp;|&nbsp; <strong>Popularity:</strong> {movie.popularity} &nbsp;|&nbsp; <strong>Rating:</strong> {movie.vote_average} ({movie.vote_count} votes)
            </div>
        </div>
    );
};

export default MovieDetail;
