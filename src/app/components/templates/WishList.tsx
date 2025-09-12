import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { removeFromWishList, clearWishList } from "../../store/wishListSlice";
import type { Movie } from "../../types/Movie";
import MovieCard from "../molecules/MovieCard";
import ButtonRemoveWish from "../atoms/ButtonRemoveWish";
import ButtonClearWishList from "../atoms/ButtonClearWishList";

const WishList: React.FC = () => {
    const movies = useSelector((state: RootState) =>
        state.wishList && Array.isArray(state.wishList.movies)
            ? state.wishList.movies
            : []
    );
    const dispatch = useDispatch();

    return (
        <div className="movie-detail-container">
            <h1 className="movie-detail-title">Tu Wishlist</h1>
            {movies.length === 0 ? (
                <p style={{ color: '#ccc', textAlign: 'center' }}>No tienes películas en tu lista de deseos.</p>
            ) : (
                <>
                    <ButtonClearWishList
                        onClick={() => {
                            if (window.confirm('¿Seguro que quieres vaciar toda la wishlist?')) {
                                dispatch(clearWishList());
                            }
                        }}
                    />
                    <ul className="movie-detail-grid">
                        {movies
                            .slice()
                            .sort((a, b) => a.title.localeCompare(b.title))
                            .map((movie: Movie) => (
                                <li key={movie.id} className="movie-detail-card">
                                    <MovieCard movie={movie} />
                                    <ButtonRemoveWish
                                        onClick={() => {
                                            if (window.confirm(`¿Seguro que quieres quitar "${movie.title}" de la wishlist?`)) {
                                                dispatch(removeFromWishList(movie.id));
                                            }
                                        }}
                                    />
                                </li>
                            ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default WishList;
