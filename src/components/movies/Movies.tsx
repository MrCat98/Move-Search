import { Row, Col } from "antd";
import MovieCard, { Movie } from "@/components/movies/MovieCard";

export default function Movies({ movies }: { movies: Movie[] }) {
  return (
    <div className="flex flex-col items-center ">
      <Row
        gutter={[30, 37]}
        className="mt-[21px] max-w-252.5 min-w-145 p-5 mx-auto">
        {movies.map((movie, index) => (
          <Col xs={24} sm={12} md={12} key={movie.id}>
            <MovieCard movie={movie} priority={index < 2} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
