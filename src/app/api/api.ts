import type { Movie } from "@/components/movies/MovieCard";

// Общий запрос к TMDB: базовый URL и токен в одном месте
export function tmdbFetch(path: string, init: RequestInit = {}) {
  return fetch(`https://api.themoviedb.org/3${path}`, {
    ...init,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      ...init.headers,
    },
  });
}

export type MoviesPage = {
  results: Movie[];
  total_results: number;
  total_pages: number;
};

const EMPTY_PAGE: MoviesPage = { results: [], total_results: 0, total_pages: 0 };

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

export const GUEST_SESSION_COOKIE = "guest_session_id";

export type GuestSession = {
  guest_session_id: string;
  expires_at: string; // "2026-09-27 12:00:00 UTC"
};

export async function createGuestSession(): Promise<GuestSession> {
  const res = await tmdbFetch("/authentication/guest_session/new");
  if (!res.ok) {
    throw new Error(`TMDB guest session error ${res.status}`);
  }
  return res.json();
}

// Фильмы, оценённые в гостевой сессии; у каждого есть поле rating
export async function getRatedMovies(sessionId: string, page: number): Promise<MoviesPage> {
  const res = await tmdbFetch(`/guest_session/${sessionId}/rated/movies?page=${page}`);
  // пока в сессии нет ни одной оценки, TMDB отвечает 404 вместо пустого списка
  if (res.status === 404) return EMPTY_PAGE;
  if (!res.ok) {
    throw new Error(`TMDB rated movies error ${res.status}`);
  }
  return res.json();
}

const MAX_RATED_PAGES = 10;

// Оценки пользователя по id фильма — чтобы показать звёзды на любой вкладке
export async function getAllRatings(sessionId: string): Promise<Record<number, number>> {
  const first = await getRatedMovies(sessionId, 1);
  const lastPage = Math.min(first.total_pages, MAX_RATED_PAGES);
  const rest = await Promise.all(
    Array.from({ length: Math.max(lastPage - 1, 0) }, (_, i) => getRatedMovies(sessionId, i + 2)),
  );

  const ratings: Record<number, number> = {};
  for (const { results } of [first, ...rest]) {
    for (const movie of results) ratings[movie.id] = movie.rating ?? 0;
  }
  return ratings;
}

// value 0 — снять оценку
export async function rateMovie(sessionId: string, movieId: number, value: number) {
  const path = `/movie/${movieId}/rating?guest_session_id=${sessionId}`;
  const res = value
    ? await tmdbFetch(path, { method: "POST", body: JSON.stringify({ value }) })
    : await tmdbFetch(path, { method: "DELETE" });
  if (!res.ok) {
    throw new Error(`TMDB rating error ${res.status}`);
  }
}

export type Genre = { id: number; name: string };

export async function getGenres(): Promise<Genre[]> {
  // список жанров почти не меняется — кэшируем на сутки
  const res = await tmdbFetch("/genre/movie/list", { next: { revalidate: 60 * 60 * 24 } });
  if (!res.ok) {
    throw new Error(`TMDB genres error ${res.status}`);
  }
  const data: { genres: Genre[] } = await res.json();
  return data.genres;
}
