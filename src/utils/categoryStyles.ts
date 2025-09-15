import type { CategoryStyle } from "../app/types/CategoryStyle";

const categoryStyles: Record<string, CategoryStyle> = {
    popular: {
        fontFamily: "'Poppins', Inter, Arial, sans-serif",
        color: "#1976d2",
        background: "#e3f2fd",
        headingColor: "#1976d2",
        buttonWish: { background: "#1976d2", color: "#fff", border: "2px solid #1976d2" },
    },
    top_rated: {
        fontFamily: "'Playfair Display', serif",
        color: "#6a1b9a",
        background: "#ede7f6",
        headingColor: "#6a1b9a",
        buttonWish: { background: "#6a1b9a", color: "#fff", border: "2px solid #6a1b9a" },
    },
    upcoming: {
        fontFamily: "'Orbitron', sans-serif",
        color: "#388e3c",
        background: "#e8f5e9",
        headingColor: "#388e3c",
        buttonWish: { background: "#388e3c", color: "#fff", border: "2px solid #388e3c" },
    },
};

export default categoryStyles;
