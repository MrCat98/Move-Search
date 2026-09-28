import { Suspense } from "react";
import MoviesSection from "@/components/movies/MoviesSection";
import Loading from "@/components/loading/Spin";
import { getRatedMovies, type MoviesPage } from "@/app/api/api";
import { getGuestSessionId } from "@/lib/session";
import { parsePage } from "@/lib/pagination";

const NO_SESSION: MoviesPage = { results: [], total_results: 0, total_pages: 0 };

// Вкладка Rated: та же вёрстка, что и у поиска, но без строки поиска
export default async function Rated({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = parsePage((await searchParams).page);
  const sessionId = await getGuestSessionId();

  return (
    <Suspense key={page} fallback={<Loading />}>
      <MoviesSection
        load={async () => (sessionId ? getRatedMovies(sessionId, page) : NO_SESSION)}
        emptyText="Вы ещё не оценили ни одного фильма"
      />
    </Suspense>
  );
}
