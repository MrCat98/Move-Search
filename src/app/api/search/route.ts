import { tmdbFetch } from "@/app/api/api";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("query") ?? "";

  const res = await tmdbFetch(`/search/movie?query=${encodeURIComponent(query)}`);

  if (!res.ok) {
    return Response.json({ error: "TMDB error" }, { status: res.status });
  }

  return Response.json(await res.json());
}
