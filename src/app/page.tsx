import Movies from "@/components/Movies";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import { getmovie } from "@/app/api/api";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const data = await getmovie(currentPage);
  return (
    <>
      <Search />
      <Movies page={currentPage} />
      <Pagination totalResults={data.total_results} />
    </>
  );
}
