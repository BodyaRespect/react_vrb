import React, { useEffect, useReducer, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById, updateMovie } from '../../api/axiosClient';
import movieReducer from '../../utils/movieReducer';
import { Movie } from '../../types/Movie';
import { validateFormData, validateImageUrl } from '../../utils/validation';
import { MovieActionTypes } from '../../types/MovieActionTypes';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [state, dispatch] = useReducer(movieReducer, {
    movie: {} as Movie,
    formData: {} as Movie,
    loading: true,
    error: null,
    isEditing: false,
  });

  const { movie, formData, loading, error, isEditing } = state;

  useEffect(() => {
    if (id) {
      dispatch({ type: MovieActionTypes.SET_LOADING });
      getMovieById(+id)
        .then(data => {
          dispatch({ type: MovieActionTypes.SET_MOVIE, payload: data });
        })
        .catch(() =>
          dispatch({
            type: MovieActionTypes.SET_ERROR,
            payload: 'Failed to load movie details.',
          }),
        );
    }
  }, [id]);

  const handleEditClick = useCallback(() => {
    if (isEditing && movie && formData) {
      if (validateFormData(formData)) {
        const isDataChanged =
          JSON.stringify(movie) !== JSON.stringify(formData);

        if (isDataChanged) {
          updateMovie(Number(id), formData)
            .then(() => {
              dispatch({ type: MovieActionTypes.SET_MOVIE, payload: formData });
            })
            .catch(() =>
              dispatch({
                type: MovieActionTypes.SET_ERROR,
                payload: 'Failed to update movie details.',
              }),
            );
        }
      } else {
        dispatch({
          type: MovieActionTypes.SET_ERROR,
          payload: 'Please fill out all fields.',
        });
      }
    }

    dispatch({ type: MovieActionTypes.TOGGLE_EDIT_MODE });
  }, [isEditing, movie, formData, id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'actors') {
      const actorsArray = value.split(',').map(actor => actor.trim());

      dispatch({
        type: MovieActionTypes.UPDATE_MOVIE,
        payload: { ...formData, [name]: actorsArray },
      });
    } else if (name === 'image') {
      if (validateImageUrl(value) || value === '') {
        dispatch({
          type: MovieActionTypes.UPDATE_MOVIE,
          payload: { ...formData, [name]: value },
        });
      } else {
        dispatch({
          type: MovieActionTypes.SET_ERROR,
          payload: 'Invalid image URL.',
        });
      }
    } else if (name === 'releaseDate') {
      dispatch({
        type: MovieActionTypes.UPDATE_MOVIE,
        payload: { ...formData, [name]: value },
      });
    } else {
      dispatch({
        type: MovieActionTypes.UPDATE_MOVIE,
        payload: { ...formData, [name]: value },
      });
    }
  };

  const formatActorsForDisplay = (actors: string[]) => {
    return actors.join(', ');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return movie ? (
    <div className="movie-details">
      <div className="movie-details__picture">
        <img
          className="movie-details__image"
          src={formData?.image || movie.image}
          alt={movie.title}
        />
      </div>

      <div className="movie-details__content">
        <button onClick={handleEditClick} className="movie-details__edit-btn">
          {isEditing ? 'Save' : 'Edit'}
        </button>

        <h2 className="movie-details__title">
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={formData?.title || ''}
              onChange={handleInputChange}
              className="movie-details__input"
            />
          ) : (
            movie.title
          )}
        </h2>

        <p className="movie-details__text">
          <label>
            Description:
            <br />
            {isEditing ? (
              <textarea
                name="description"
                value={formData?.description || ''}
                onChange={handleInputChange}
                className="movie-details__textarea"
              />
            ) : (
              movie.description
            )}
          </label>
        </p>

        <p className="movie-details__text">
          <label>
            Director:
            <br />
            {isEditing ? (
              <input
                type="text"
                name="director"
                value={formData?.director || ''}
                onChange={handleInputChange}
                className="movie-details__input"
              />
            ) : (
              movie.director
            )}
          </label>
        </p>

        <p className="movie-details__text">
          <label>
            Actors:
            <br />
            {isEditing ? (
              <input
                type="text"
                name="actors"
                value={formData?.actors.join(', ') || ''}
                onChange={handleInputChange}
                className="movie-details__input"
              />
            ) : (
              formatActorsForDisplay(movie.actors)
            )}
          </label>
        </p>

        <p className="movie-details__text">
          <label>
            Genre:
            <br />
            {isEditing ? (
              <input
                type="text"
                name="genre"
                value={formData?.genre || ''}
                onChange={handleInputChange}
                className="movie-details__input"
              />
            ) : (
              movie.genre
            )}
          </label>
        </p>

        <p className="movie-details__text">
          <label>
            Rating:
            <br />
            {isEditing ? (
              <input
                type="number"
                name="rating"
                value={formData?.rating || ''}
                onChange={handleInputChange}
                className="movie-details__input"
              />
            ) : (
              movie.rating
            )}
          </label>
        </p>

        <p className="movie-details__text">
          <label>
            {isEditing && (
              <>
                Image URL:
                <input
                  type="text"
                  name="image"
                  value={formData?.image || ''}
                  onChange={handleInputChange}
                  className="movie-details__input"
                />
              </>
            )}
          </label>
        </p>

        <p className="movie-details__text">
          <label>
            Release Date:
            <br />
            {isEditing ? (
              <input
                type="date"
                name="releaseDate"
                value={formData?.releaseDate || ''}
                onChange={handleInputChange}
                className="movie-details__input"
              />
            ) : (
              movie.releaseDate
            )}
          </label>
        </p>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default MovieDetails;
