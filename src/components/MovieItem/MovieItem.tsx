/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types/Movie';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addFavorite,
  removeFavorite,
} from '../../store/reducers/favoriteReducer';
import { deleteMovie } from '../../api/axiosClient';

type Props = {
  movie: Movie;
  onDelete?: (id: number) => void;
  showDeleteButton?: boolean;
};

const MovieItem: React.FC<Props> = React.memo(
  ({ movie, onDelete, showDeleteButton = true }) => {
    const dispatch = useAppDispatch();

    const handleDelete = useCallback(async () => {
      try {
        await deleteMovie(movie.id);
        if (onDelete) {
          onDelete(movie.id);
        }
      } catch {
        alert('Failed to delete the movie');
      }
    }, [movie.id, onDelete]);

    const isFavorite = useAppSelector(state =>
      state.favorites.favoriteMovies.some(fav => fav.id === movie.id),
    );

    const handleFavoriteToggle = useCallback(() => {
      isFavorite
        ? dispatch(removeFavorite(movie.id))
        : dispatch(addFavorite(movie));
    }, [isFavorite, movie, dispatch]);

    return (
      <div className="card">
        <div className="card__content">
          <div className="card__image">
            <img
              src={movie.image}
              alt={movie.title}
              className="card__picture"
            />
          </div>

          <div className="card__info">
            <h2 className="card__name">{movie.title}</h2>

            <div className="card__shipping-text">{`Rating: ${movie.rating}`}</div>

            <div className="card__shipping-text">{`Release date: ${movie.releaseDate}`}</div>

            <div className="card__shipping">
              <Link to={`/movie/${movie.id}`} className="card__button">
                View Details
              </Link>

              <div className="card__shipping-buttons">
                <button
                  className={`card__favorite ${isFavorite ? 'card__favorite--active' : ''}`}
                  onClick={handleFavoriteToggle}
                >
                  ❤️
                </button>

                {showDeleteButton && (
                  <button className="card__delete" onClick={handleDelete}>
                    ✗
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

MovieItem.displayName = 'MovieItem';

export default MovieItem;
