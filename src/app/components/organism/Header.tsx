import React, { useState } from "react";
import ButtonHamburger from "../atoms/ButtonHamburger";
import NavButtonLux from "../atoms/NavButtonLux";
import NavButtonWish from "../atoms/NavButtonWish";

interface HeaderProps {
    categorySlugs?: { slug: string; label: string }[];
    category?: string;
    setCategory?: (slug: string) => void;
    isActive?: boolean;
}

const categories = [
    { slug: "popular", label: "Popular" },
    { slug: "top_rated", label: "Top Rated" },
    { slug: "upcoming", label: "Upcoming" },
    //{ slug: "now_playing", label: "Now Playing" },
];

const Header: React.FC<HeaderProps> = ({ isActive }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="header-container">
            <div className="header-left">
                {isActive && (
                    <>
                        <ButtonHamburger onClick={() => setMenuOpen((o) => !o)} isActive={isActive} />
                        {menuOpen && (
                            <nav className="menu-categories">
                                <ul>
                                    {categories.map(cat => (
                                        <li key={cat.slug}>
                                            <a
                                                href={`#${cat.slug}`}
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                {cat.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                    </>
                )}
            </div>
            <div className="header-right">
                <NavButtonLux />
                <NavButtonWish />
            </div>
        </header>
    );
};

export default Header;
