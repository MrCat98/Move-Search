export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('query') ?? '';

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
    }
  );

  const data = await res.json();

  return Response.json(data);
}
