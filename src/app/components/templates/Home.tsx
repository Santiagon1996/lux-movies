import MoviesList from "../organism/MovieList";

const categorySlugs = [
    { slug: "popular", label: "Populares" },
    { slug: "top_rated", label: "Mejor Valoradas" },
    { slug: "upcoming", label: "Próximamente" },
    { slug: "now_playing", label: "En Cartelera" },
];

const Home: React.FC = () => {
    return (
        <>

            <div className="movie-detail-container" style={{ marginTop: 0 }}>
                {categorySlugs.map((cat) => (
                    <section key={cat.slug} id={cat.slug} style={{ marginBottom: '3rem' }}>
                        <h2 className="movie-detail-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{cat.label}</h2>
                        <MoviesList category={cat.slug} />
                    </section>
                ))}
            </div>
        </>
    );
};

export default Home;