import React from "react";

interface SinopsisProps {
    text: string;
    style?: React.CSSProperties;
}

const Sinopsis: React.FC<SinopsisProps> = ({ text, style }) => (
    <div style={{ color: style?.color || "#fff", fontSize: style?.fontSize || "1rem", lineHeight: 1.6, background: style?.background || "#222", borderRadius: 8, padding: "1rem", marginBottom: "1rem", ...style }}>
        <h3 style={{ marginBottom: "0.5rem" }}>Sinopsis</h3>
        <p>{text}</p>
    </div>
);

export default Sinopsis;
