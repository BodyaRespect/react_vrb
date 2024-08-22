import React from 'react';
import MovieItem from '../../components/MovieItem/MovieItem';
import { Movie } from '../../types/Movie';

type Props = {
  movies: Movie[];
};

const MovieList: React.FC<Props> = ({ movies }) => (
  <div className="movie-list">
    {movies.map(movie => (
      <MovieItem key={movie.id} movie={movie} />
    ))}
  </div>
);

export default MovieList;
