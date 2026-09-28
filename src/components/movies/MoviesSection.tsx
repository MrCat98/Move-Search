import { Alert } from "antd";
import Movies from "@/components/movies/Movies";
import Pagination from "@/components/pagination/Pagination";
import ErrorAlert from "@/components/errors/ErrorAlert";
import type { MoviesPage } from "@/app/api/api";
import { MAX_PAGES, PAGE_SIZE } from "@/lib/pagination";

// Общая часть вкладок: загрузка страницы фильмов, ошибка, пустой список, сетка и пагинация
export default async function MoviesSection({
  load,
  emptyText,
}: {
  load: () => Promise<MoviesPage>;
  emptyText: string;
}) {
  let data: MoviesPage;
  try {
    data = await load();
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
        <Alert type="warning" showIcon title={emptyText} />
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
