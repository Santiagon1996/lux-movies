import React, { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
    categorySlugs?: { slug: string; label: string }[];
    category?: string;
    setCategory?: (slug: string) => void;
    isActive?: boolean;
}

const categories = [
    { slug: "popular", label: "Populares" },
    { slug: "top_rated", label: "Mejor Valoradas" },
    { slug: "upcoming", label: "Próximamente" },
    { slug: "now_playing", label: "En Cartelera" },
];

const Header: React.FC<HeaderProps> = ({ isActive }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="movie-detail-container flex items-center justify-between">
            <div className="flex items-center gap-4">
                {isActive && (
                    <div className="relative">
                        <button
                            className="w-10 h-10 flex flex-col justify-center items-center bg-gray-700 rounded hover:bg-gray-600"
                            onClick={() => setMenuOpen((o) => !o)}
                            aria-label="Abrir menú de categorías"
                        >
                            <span className="block w-6 h-1 bg-white mb-1 rounded"></span>
                            <span className="block w-6 h-1 bg-white mb-1 rounded"></span>
                            <span className="block w-6 h-1 bg-white rounded"></span>
                        </button>
                        {menuOpen && (
                            <nav className="absolute left-0 top-12 bg-gray-800 shadow-lg rounded p-2 z-10 min-w-[160px]">
                                <ul>
                                    {categories.map((cat) => (
                                        <li key={cat.slug}>
                                            <a
                                                href={`#${cat.slug}`}
                                                className="block px-4 py-2 text-white hover:bg-gray-700 rounded"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                {cat.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                    </div>
                )}
                <Link to="/" className="text-2xl font-bold">LuxMovies</Link>
            </div>
            <Link to="/wishlist" className="bg-yellow-500 text-gray-900 px-4 py-2 rounded font-semibold hover:bg-yellow-400 transition">Wishlist</Link>
        </header>
    );
};

export default Header;
