import Movies from "@/components/movies/Movies";
import Search from "@/components/search/Search";
import Pagination from "@/components/pagination/Pagination";
import { getMovies, type MoviesPage } from "@/app/api/api";
import { Suspense } from "react";
import { Alert } from "antd";
import Loading from "@/components/loading/Spin";
import OfflineBanner from "@/components/errors/offline/OfflineBanner";
import ErrorAlert from "@/components/errors/ErrorAlert";
import { MAX_PAGES, PAGE_SIZE } from "@/lib/pagination";

async function MoviesSection({ page, query }: { page: number; query: string }) {
  let data: MoviesPage;
  try {
    data = await getMovies(page, query);
  } catch (e) {
    console.error(e);
    return (
      <ErrorAlert
        title="Не удалось загрузить фильмы"
        description="Сервис TMDB не отвечает. Попробуйте позже."
      />
    );
  }

  if (data.results.length === 0) {
    return (
      <div className="w-full max-w-252.5 mx-auto p-5">
        <Alert
          type="warning"
          showIcon
          title={query ? `По запросу «${query}» ничего не найдено` : "Фильмы не найдены"}
        />
      </div>
    );
  }

  return (
    <>
      <Movies movies={data.results} />
      <Pagination totalResults={Math.min(data.total_results, MAX_PAGES * PAGE_SIZE)} />
    </>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const params = await searchParams;
  const query = params.query?.trim() ?? "";
  const currentPage = Math.min(Math.max(Math.trunc(Number(params.page)) || 1, 1), MAX_PAGES);

  return (
    <>
      <OfflineBanner />
      <Search />
      <Suspense key={`${query}:${currentPage}`} fallback={<Loading />}>
        <MoviesSection page={currentPage} query={query} />
      </Suspense>
    </>
  );
}
