export async function getAuthStatus() {
  const res = await fetch('https://api.themoviedb.org/3/authentication', {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  });

  return res.json();
}
