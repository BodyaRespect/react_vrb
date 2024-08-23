import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { removeFavorite } from '../../store/reducers/favoriteReducer';
import MovieList from '../../components/MovieList/MovieList';

const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();
  const favoriteMovies = useAppSelector(
    (state: RootState) => state.favorites.favoriteMovies,
  );

  const handleMovieDeleted = (id: number) => {
    dispatch(removeFavorite(id));
  };

  return (
    <div className="favorites">
      <h1>Favorite Movies</h1>

      {favoriteMovies.length === 0 ? (
        <p className="page-error">No favorite movies found.</p>
      ) : (
        <MovieList
          movies={favoriteMovies}
          onMovieDeleted={handleMovieDeleted}
          showDeleteButton={false}
        />
      )}
    </div>
  );
};

export default Favorites;
