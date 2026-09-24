import { useState } from "react";
import { Movie } from "@/components/movies/MovieCard";
import { HttpError } from "@/app/errors/errors";
import useErrorMessage from "./useErrorMessage";

export function useSearchMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const { ensureOnline, showError, showNotFound, contextHolder } = useErrorMessage();

  const searchMovies = async (query: string) => {
    // 1. Проверяем пустой запрос
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    // 2. Делегируем проверку сети хуку ошибок
    if (!ensureOnline()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new HttpError(res.status);
      
      const data = await res.json();
      const results: Movie[] = data.results ?? [];
      
      setMovies(results);
      if (results.length === 0) {
        showNotFound(query);
      }
    } catch (e) {
      // При ошибке сети или сервера НЕ очищаем прошлые результаты
      showError(e);
    } finally {
      setLoading(false);
    }
  };

  return { movies, loading, searchMovies, contextHolder };
}
