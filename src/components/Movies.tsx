import { getmovie } from "@/app/api/api";
import { Row, Col,Pagination } from "antd";
import MovieCard, { Movie } from "@/components/MovieCard";

export default async function Movies() {
  const data = await getmovie();
  const movies: Movie[] = data.results ?? [];

  return (
    <div className="flex flex-col items-center ">
    <Row gutter={[30, 37]} className="mt-[21px] max-w-252.5 min-w-145 p-5 mx-auto">
      {movies.map((movie, index) => (
        <Col xs={24} sm={12} md={12} key={movie.id} >
          <MovieCard movie={movie} priority={index < 2} />
        </Col>
      ))}
    </Row>
      
    </div>
  );
}
