"use client";

import { Typography, Flex, Tag, Rate } from "antd";
import formatDate from "@/lib/formatDate";
import { truncate } from "@/lib/truncate";
import Image from "next/image";
import { useGenres } from "@/context/GenresContext";
import { useRatings } from "@/context/RatingsContext";

const { Title, Text } = Typography;

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  rating?: number; // оценка пользователя — только в списке оценённых фильмов
};

// Цвет круга с рейтингом TMDB
function ratingColor(value: number) {
  if (value < 3) return "#E90000";
  if (value < 5) return "#E97E00";
  if (value <= 7) return "#E9D100";
  return "#66E900";
}

export default function MovieCard({
  movie,
  priority = false,
}: {
  movie: Movie;
  priority?: boolean;
}) {
  const genres = useGenres();
  const { ratings, rate } = useRatings();

  return (
    // Телефон: маленький постер слева от заголовка, даты и жанров; описание и звёзды — под ним на всю ширину.
    // С md: — постер на всю высоту слева, весь текст в правой колонке.
    <div
      className="relative grid grid-cols-[60px_1fr] gap-x-3 gap-y-2 p-2.5 w-full min-w-97 mx-auto
        md:grid-cols-[183px_1fr] md:grid-rows-[auto_auto_auto_auto_auto_1fr] md:gap-x-4 md:gap-y-1.75
        md:p-0 md:pr-2.5 md:h-69.75 md:w-113.75
        shadow-[0_10px_25px_rgba(0,0,0,0.15)] border border-white overflow-hidden">
      {movie.poster_path && (
        <Image
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          width={200}
          height={300}
          priority={priority}
          className="row-span-3 w-15 h-auto md:row-span-6 md:w-45.75 md:h-full object-cover"
        />
      )}

      <div
        className="absolute top-2.5 right-2.5 flex items-center justify-center size-7.5 rounded-full border-2 "
        style={{ borderColor: ratingColor(movie.vote_average) }}
        title="Рейтинг TMDB">
        {movie.vote_average.toFixed(1)}
      </div>

      <Title level={5} className="col-start-2 pr-9 font-normal m-0 md:pt-2.5">
        {movie.title}
      </Title>
      <Text type="secondary" className="col-start-2 text-xs text-[#827E7E]">
        {formatDate(movie.release_date)}
      </Text>
      <Flex wrap gap={4} className="col-start-2 self-start">
        {movie.genre_ids.map((id) =>
          genres.has(id) ? (
            <Tag key={id} variant="outlined" className="m-0">
              {genres.get(id)}
            </Tag>
          ) : null,
        )}
      </Flex>
      <Text className="col-span-2 md:col-span-1 md:col-start-2 min-h-0 overflow-hidden">
        {truncate(movie.overview, 150)}
      </Text>
      <Rate
        allowHalf
        count={10}
        value={ratings[movie.id] ?? movie.rating ?? 0}
        onChange={(value) => rate(movie.id, value)}
        style={{ fontSize: 15 }}
        className="col-span-2 justify-self-end md:col-span-1 md:col-start-2 md:justify-self-start md:pb-3"
      />
    </div>
  );
}
