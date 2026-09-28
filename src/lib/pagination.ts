export const PAGE_SIZE = 20; // TMDB всегда отдаёт по 20 фильмов на страницу
export const MAX_PAGES = 500; // дальше 500-й страницы TMDB отвечает ошибкой

// ?page=… из адреса → номер страницы от 1 до MAX_PAGES
export function parsePage(page: string | undefined) {
  return Math.min(Math.max(Math.trunc(Number(page)) || 1, 1), MAX_PAGES);
}
