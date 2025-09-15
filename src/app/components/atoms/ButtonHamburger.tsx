import React from "react";

interface ButtonHamburgerProps {
    onClick: () => void;
    isActive?: boolean;
}

const ButtonHamburger: React.FC<ButtonHamburgerProps> = ({ onClick, isActive }) => (
    <button
        className="hamburger-btn"
        onClick={onClick}
        aria-label="Abrir menú de categorías"
        style={{ display: isActive ? 'flex' : 'none' }}
    >
        <span className="material-symbols-outlined">menu</span>
    </button>
);

export default ButtonHamburger;
