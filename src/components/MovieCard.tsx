"use client";

import { Typography,Flex,Tag } from "antd";

import formatDate from '@/lib/FormatDate/formatDate'
import {truncate} from '@/lib/TrunceCate/cateText'
const { Title, Text } = Typography;

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
};

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 1)",
        height: 279,
        overflow:'hidden'
      }}>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          style={{ flexShrink: 0, width: 183, height: "auto" , borderTopLeftRadius:12}}
        />
      )}
      <Flex align="start" vertical  style={{gap:7}}>
        <Title  style={{ fontSize: 20, paddingTop: 10, fontWeight: 400,}}>
          {movie.title}
        </Title>
        <Text style={{ fontSize: 12, color:'#827E7E '}}>{formatDate(movie.release_date)}</Text>
        <Tag color={'rgba(217, 217, 217, 1)'} style={{color:'rgba(0, 0, 0, 0.65)'
        }}>blue</Tag>
        <Text style={{ fontSize: 12, fontWeight:400}}>{truncate(movie.overview, 200)}</Text>
      </Flex>
    </div>
  );
}
