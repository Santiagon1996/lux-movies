import React from "react";
import { Link } from "react-router-dom";

const NavButtonWish: React.FC = () => (
    <Link to="/wishlist" className="header-wishlist">
        <span className="material-symbols-outlined">
            star
        </span>    </Link>
);

export default NavButtonWish;
