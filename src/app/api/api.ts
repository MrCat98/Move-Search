import type { Movie } from "@/components/movies/MovieCard";

// Общий запрос к TMDB: базовый URL и токен в одном месте
export function tmdbFetch(path: string) {
  return fetch(`https://api.themoviedb.org/3${path}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  });
}

export type MoviesPage = {
  results: Movie[];
  total_results: number;
};

// С запросом — поиск по названию, без него — популярные фильмы
export async function getMovies(page: number, query = ""): Promise<MoviesPage> {
  const path = query
    ? `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    : `/movie/popular?page=${page}`;

  const res = await tmdbFetch(path);
  if (!res.ok) {
    throw new Error(`TMDB error ${res.status}`);
  }
  return res.json();
}
