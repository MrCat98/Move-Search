"use client";

import { useState } from "react";
import { Input, Row, Col } from "antd";
import MovieCard, { Movie } from "@/components/MovieCard";

export default function SearchMovie() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    setMovies(data.results ?? []);
  };

  return (
    <>
      <Input.Search
        placeholder="Type to search..."
        onSearch={handleSearch}
        style={{ marginTop: 19 }}
      />

      <Row gutter={[36, 37]} style={{ marginTop: 21 }}>
        {movies.map((movie) => (
          <Col span={12} key={movie.id}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
}
