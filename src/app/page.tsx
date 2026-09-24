import Movies from "@/components/movies/Movies";
import Search from "@/components/search/Search";
import Pagination from "@/components/pagination/Pagination";
import { getmovie } from "@/app/api/api";
import { Suspense } from "react";
import Loading from "@/components/loading/Spin";
import OfflineBanner from "@/app/errors/offline/OfflineBanner";

const MAX_PAGES = 200; // TMDB отдаёт не больше 500 страниц
const PAGE_SIZE = 10;

async function MoviesSection({ page }: { page: number }) {
  const data = await getmovie(page);
  return (
    <>
      <Movies movies={data.results ?? []} />
      <Pagination totalResults={Math.min(data.total_results, MAX_PAGES * PAGE_SIZE)} />
    </>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.min(Math.max(Math.trunc(Number(page)) || 1, 1), MAX_PAGES);

  return (
    <>
      <OfflineBanner />
      <Search />
      <Suspense key={currentPage} fallback={<Loading />}>
        <MoviesSection page={currentPage} />
      </Suspense>
    </>
  );
}
