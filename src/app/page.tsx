import { Suspense } from "react";
import Search from "@/components/search/Search";
import MoviesSection from "@/components/movies/MoviesSection";
import Loading from "@/components/loading/Spin";
import { getMovies } from "@/app/api/api";
import { parsePage } from "@/lib/pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const params = await searchParams;
  const query = params.query?.trim() ?? "";
  const page = parsePage(params.page);

  return (
    <>
      <Search />
      <Suspense key={`${query}:${page}`} fallback={<Loading />}>
        <MoviesSection
          load={() => getMovies(page, query)}
          emptyText={query ? `По запросу «${query}» ничего не найдено` : "Фильмы не найдены"}
        />
      </Suspense>
    </>
  );
}
