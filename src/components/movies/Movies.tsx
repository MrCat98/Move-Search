import { Row, Col } from "antd";
import MovieCard, { Movie } from "@/components/movies/MovieCard";

export default function Movies({ movies }: { movies: Movie[] }) {
  return (
    <div className="flex flex-col items-center ">
      <Row
        gutter={[30, 37]}
        justify={"center"}
        className="mt-5.25 w-full max-w-252.5">
        {movies.map((movie, index) => (
          <Col xs={24} sm={24} md={24} lg={12} key={movie.id}>
            <MovieCard movie={movie} priority={index < 2} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
