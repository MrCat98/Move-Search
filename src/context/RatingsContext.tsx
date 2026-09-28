"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { App } from "antd";
import { setRating } from "@/app/actions";

type Ratings = Record<number, number>;

const RatingsContext = createContext<{
  ratings: Ratings;
  rate: (movieId: number, value: number) => void;
}>({ ratings: {}, rate: () => {} });

// Оценки пользователя по id фильма. Начальные значения приходят с сервера,
// дальше обновляются сразу при клике, не дожидаясь ответа TMDB
export function RatingsProvider({ initial, children }: { initial: Ratings; children: ReactNode }) {
  const [ratings, setRatings] = useState(initial);
  const { message } = App.useApp();

  const rate = async (movieId: number, value: number) => {
    const previous = ratings[movieId] ?? 0;
    setRatings((r) => ({ ...r, [movieId]: value }));
    try {
      await setRating(movieId, value);
    } catch (e) {
      console.error(e);
      setRatings((r) => ({ ...r, [movieId]: previous }));
      message.error("Не удалось сохранить оценку");
    }
  };

  return <RatingsContext value={{ ratings, rate }}>{children}</RatingsContext>;
}

export function useRatings() {
  return useContext(RatingsContext);
}
