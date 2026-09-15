import { API } from '@/app/api/api'
import { Row, Col } from 'antd'
import MovieCard, { Movie } from '@/app/components/MovieCard'

export default async function Movies() {
  const data = await API();
  const movies: Movie[] = data.results ?? [];

  return (
    <Row gutter={[36,37]} style={{ marginTop: 21,}}>
      {movies.map((movie) => (
        <Col span={12} key={movie.id}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
}
