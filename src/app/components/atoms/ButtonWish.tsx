
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "../../store/wishListSlice";
import type { Movie } from "../../types/Movie";
import type { RootState } from "../../store/store";

interface ButtonWishProps {
    movie: Movie;
    style?: React.CSSProperties;
}

const ButtonWish: React.FC<ButtonWishProps> = ({ movie, style }) => {
    const dispatch = useDispatch();
    const isWished = useSelector((state: RootState) =>
        state.wishList && Array.isArray(state.wishList.movies)
            ? state.wishList.movies.some((m) => m.id === movie.id)
            : false
    );

    const [showMsg, setShowMsg] = useState(false);

    const handleClick = () => {
        if (!isWished) {
            dispatch(addToWishList(movie));
            setShowMsg(true);
            setTimeout(() => setShowMsg(false), 2000);
        }
    };

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <button
                onClick={handleClick}
                disabled={isWished}
                style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: 8,
                    background: isWished ? "#ff9800" : (style?.background || "#222"),
                    color: isWished ? "#222" : (style?.color || "#fff"),
                    fontWeight: "bold",
                    border: style?.border || "2px solid #ff9800",
                    cursor: isWished ? "not-allowed" : "pointer",
                    boxShadow: isWished ? "0 2px 8px #ff980055" : "none",
                    transition: "all 0.2s",
                    ...style
                }}
            >
                {isWished ? "On Wishlist" : "Add to Favorites"}
            </button>
            {showMsg && (
                <span
                    style={{
                        position: "absolute",
                        top: "-2.2rem",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#222",
                        color: "#ff9800",
                        padding: "0.5rem 1rem",
                        borderRadius: 6,
                        fontWeight: "bold",
                        fontSize: "0.95rem",
                        boxShadow: "0 2px 8px #00000033"
                    }}
                >
                    ¡Added to Favorites!
                </span>
            )}
        </div>
    );
};

export default ButtonWish;
