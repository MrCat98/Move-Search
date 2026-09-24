"use client";

import { Input } from "antd";
import Movies from "@/components/movies/Movies";
import { useSearchMovies } from "@/lib/hooks/useSearchMovies";

export default function SearchMovie() {
  // Вся логика, стейты и обработка ошибок теперь инкапсулированы здесь
  const { movies, loading, searchMovies, contextHolder } = useSearchMovies();

  return (
    <div className="flex flex-col items-center w-full px-4">
      {/* Контекст для отображения уведомлений об ошибках Ant Design */}
      {contextHolder}

      <Input.Search
        placeholder="Type to search..."
        onSearch={searchMovies}
        loading={loading}
        disabled={loading} // Блокируем ввод во время активного запроса
        className="mt-[19px] w-full"
        size="large"
      />

      {/* Убрал внешний Spin, так как лоадер уже крутится внутри Input.Search */}
      <Movies movies={movies} />
    </div>
  );
}
