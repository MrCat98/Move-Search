'use client'

import { Typography, Flex,Tag } from "antd";
import formatDate from "@/lib/formatDate";
import { truncate } from "@/lib/truncate";
import Image from "next/image";

const { Title, Text } = Typography;

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
};

export default function MovieCard({
  movie,
  priority = false,
}: {
  movie: Movie;
  priority?: boolean;
}) {
  return (
    <div className="flex gap-4 shadow-[0_10px_25px_rgba(0,0,0,0.15)] rounded-xl border border-white h-69.75 overflow-hidden max-w-112.75">
      {movie.poster_path && (
        <Image
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          width={200}
          height={300}
          priority={priority}
          className="shrink-0 w-45.75 h-auto rounded-tl-xl"
        />
      )}
      <Flex align="start" vertical className="gap-1.75 ">
        <Title level={5} className=" pt-2.5 font-normal">
          {movie.title}
        </Title>
        <Text className="text-xs text-[#827E7E]">
          {formatDate(movie.release_date)}
        </Text>
       <Tag variant={"outlined"} >Movie tags</Tag>
        <Text className="text-xs font-normal">
          {truncate(movie.overview, 200)}
        </Text>
      </Flex>
    </div>
  );
}
