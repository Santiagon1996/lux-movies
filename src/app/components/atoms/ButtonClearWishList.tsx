import React from "react";

interface ButtonClearWishListProps {
    onClick: () => void;
}

const ButtonClearWishList: React.FC<ButtonClearWishListProps> = ({ onClick }) => (
    <button
        onClick={onClick}
        style={{
            marginBottom: "2rem",
            padding: "0.7rem 1.5rem",
            background: "#ff9800",
            color: "#222",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.2s"
        }}
    >
        Clear
    </button>
);

export default ButtonClearWishList;
