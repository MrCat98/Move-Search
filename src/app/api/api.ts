// Общий запрос к TMDB: базовый URL и токен в одном месте
export function tmdbFetch(path: string) {
  return fetch(`https://api.themoviedb.org/3${path}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  });
}

export async function getmovie(page: number = 1) {
  const res = await tmdbFetch(`/movie/popular?page=${page}`);
  if (!res.ok) {
    throw new Error(`TMDB error ${res.status}`);
  }
  return res.json();
}
