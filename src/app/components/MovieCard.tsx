export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  popularity: number;
  vote_average: number;
};

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 1)',
        height:279,
      }}
    >
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          style={{ flexShrink: 0, width: 183, height: 'auto' }}
        />
      )}
      <div>
        <h1>{movie.title}</h1>
        <div>{movie.release_date}</div>
        <p>{movie.overview}</p>
        <div>{movie.vote_average.toFixed(1)}</div>
      </div>
    </div>
  );
}
