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

     <div className="flex flex-col items-center ">
         <Row gutter={[30, 37]} className="mt-[21px] max-w-252.5 min-w-145 p-5 mx-auto">
           {movies.map((movie) => (
             <Col xs={24} sm={12} md={12} key={movie.id} >
               <MovieCard movie={movie} />
             </Col>
           ))}
         </Row>
           
         </div>
    </>
  );
}
