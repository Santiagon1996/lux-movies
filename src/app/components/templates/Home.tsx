import MoviesList from "../organism/MovieList";

const categorySlugs = [
    { slug: "popular", label: "Popular" },
    { slug: "top_rated", label: "Top Rated" },
    { slug: "upcoming", label: "Upcoming" },
    // { slug: "now_playing", label: "Now Playing" },
];

const Home: React.FC = () => {
    return (
        <div data-testid="home-main-container" className="movie-detail-container" style={{ marginTop: 0 }}>
            {categorySlugs.map((cat) => (
                <section key={cat.slug} id={cat.slug} style={{ marginBottom: '3rem' }}>
                    <h2 className="movie-detail-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{cat.label}</h2>
                    <MoviesList category={cat.slug} />
                </section>
            ))}
        </div>
    );
};

export default Home;