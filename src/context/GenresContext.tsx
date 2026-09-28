"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Genre } from "@/app/api/api";

// id жанра → название; список загружается один раз в корневом layout
const GenresContext = createContext<Map<number, string>>(new Map());

export function GenresProvider({ genres, children }: { genres: Genre[]; children: ReactNode }) {
  const byId = useMemo(() => new Map(genres.map((g) => [g.id, g.name])), [genres]);
  return <GenresContext value={byId}>{children}</GenresContext>;
}

export function useGenres() {
  return useContext(GenresContext);
}
