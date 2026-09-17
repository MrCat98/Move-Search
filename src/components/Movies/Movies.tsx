import { API } from "@/app/api/api";
import { Row, Col } from "antd";
import MovieCard, { Movie } from "@/components/MovieCard/MovieCard";

export default async function Movies() {
  const data = await API();
  const movies: Movie[] = data.results ?? [];

  return (
    <Row gutter={[30, 37]} style={{ marginTop: 21, padding: 20 }}>
      {movies.map((movie) => (
        <Col xs={24} sm={24} md={12} key={movie.id}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
}
