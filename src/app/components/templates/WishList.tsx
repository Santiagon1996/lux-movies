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
        <div className="WishList-container">
            <h1 className="WishList-title">Favorites</h1>
            {movies.length === 0 ? (
                <p className="WishList-empty">You have no movies in your favorites list.</p>
            ) : (
                <>
                    <ButtonClearWishList
                        onClick={() => {
                            if (window.confirm('Are you sure you want to clear your favorites list?')) {
                                dispatch(clearWishList());
                            }
                        }}
                    />
                    <ul className="WishList-grid">
                        {movies
                            .slice()
                            .sort((a, b) => a.title.localeCompare(b.title))
                            .map((movie: Movie) => (
                                <li key={movie.id} className="WishList-card">
                                    <MovieCard movie={movie} category="wishlist" />
                                    <ButtonRemoveWish
                                        onClick={() => {
                                            if (window.confirm(`¿Are you sure you want to remove "${movie.title}" from your favorites list?`)) {
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
