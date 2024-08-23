import React from 'react';
import { Movie } from '../../types/Movie';
import MovieItem from '../MovieItem/MovieItem';

type Props = {
  movies: Movie[];
  onMovieDeleted: (id: number) => void;
  showDeleteButton?: boolean;
};

const MovieList: React.FC<Props> = React.memo(
  ({ movies, onMovieDeleted, showDeleteButton = true }) => {
    return (
      <div className="movie-list">
        {movies.map(movie => (
          <MovieItem
            key={movie.id}
            movie={movie}
            onDelete={onMovieDeleted}
            showDeleteButton={showDeleteButton}
          />
        ))}
      </div>
    );
  },
);

MovieList.displayName = 'MovieList';

export default MovieList;
