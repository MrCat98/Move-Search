"use server";

import { refresh } from "next/cache";
import { rateMovie } from "@/app/api/api";
import { getGuestSessionId } from "@/lib/session";

// Оценка пользователя: от 0.5 до 10 с шагом 0.5, 0 — снять оценку
export async function setRating(movieId: number, value: number) {
  if (!Number.isInteger(movieId) || !Number.isInteger(value * 2) || value < 0 || value > 10) {
    throw new Error("Некорректная оценка");
  }

  const sessionId = await getGuestSessionId();
  if (!sessionId) {
    throw new Error("Нет гостевой сессии");
  }

  await rateMovie(sessionId, movieId, value);
  // перерисовать текущую страницу: во вкладке Rated список должен обновиться
  refresh();
}
