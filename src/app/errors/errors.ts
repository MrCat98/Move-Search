export const OFFLINE_MESSAGE = "Нет подключения к интернету";
export const UNKNOWN_MESSAGE = "Что-то пошло не так";

export class HttpError extends Error {
  constructor(public status: number) {
    super(`Ошибка поиска (${status})`);
  }
}

// fetch бросает TypeError при сетевом сбое, HttpError — при плохом статусе ответа
export function getErrorMessage(e: unknown): string {
  if (e instanceof TypeError) return OFFLINE_MESSAGE;
  if (e instanceof Error) return e.message;
  return UNKNOWN_MESSAGE;
}
