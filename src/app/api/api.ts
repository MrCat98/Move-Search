export async function getmovie(page: number = 1) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?page=${page}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  });
  return res.json();
}
