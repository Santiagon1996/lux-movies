import React from "react";

interface SinopsisProps {
    text: string;
}

const Sinopsis: React.FC<SinopsisProps> = ({ text }) => (
    <div style={{ color: "#fff", fontSize: "1rem", lineHeight: 1.6, background: "#222", borderRadius: 8, padding: "1rem", marginBottom: "1rem" }}>
        <h3 style={{ color: "#ff9800", marginBottom: "0.5rem" }}>Sinopsis</h3>
        <p>{text}</p>
    </div>
);

export default Sinopsis;
