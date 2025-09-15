import React from "react";

interface ButtonRemoveWishProps {
    onClick: () => void;
}

const ButtonRemoveWish: React.FC<ButtonRemoveWishProps> = ({ onClick }) => (
    <button
        onClick={onClick}
        style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            background: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.2s"
        }}
    >
        Remove
    </button>
);

export default ButtonRemoveWish;
