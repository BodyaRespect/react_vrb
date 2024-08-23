/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { addMovie } from '../../api/axiosClient';

interface MovieFormInputs {
  title: string;
  description: string;
  actors: string;
  director: string;
  genre: string;
  rating: number;
  releaseDate: string;
  image: string;
}

interface MovieFormProps {
  onMovieAdded: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ onMovieAdded }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovieFormInputs>();

  const onSubmit: SubmitHandler<MovieFormInputs> = async data => {
    const formattedData = {
      ...data,
      actors: data.actors.split(',').map(actor => actor.trim()),
    };

    try {
      await addMovie(formattedData);
      alert('Movie created successfully!');
      onMovieAdded(); // Оновлює список фільмів після успішного додавання
    } catch {
      alert('Failed to create the movie');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="movie-form">
      <label className="movie-form__label">
        Title:
        <input
          {...register('title', { required: 'Title is required' })}
          className="movie-form__input"
        />
        {errors.title && (
          <span className="movie-form__error">{errors.title.message}</span>
        )}
      </label>

      <label className="movie-form__label">
        Description:
        <textarea
          {...register('description', { required: 'Description is required' })}
          className="movie-form__textarea"
        />
        {errors.description && (
          <span className="movie-form__error">
            {errors.description.message}
          </span>
        )}
      </label>

      <label className="movie-form__label">
        Actors (comma separated):
        <input
          {...register('actors', { required: 'Actors field is required' })}
          className="movie-form__input"
        />
        {errors.actors && (
          <span className="movie-form__error">{errors.actors.message}</span>
        )}
      </label>

      <label className="movie-form__label">
        Director:
        <input
          {...register('director', { required: 'Director is required' })}
          className="movie-form__input"
        />
        {errors.director && (
          <span className="movie-form__error">{errors.director.message}</span>
        )}
      </label>

      <label className="movie-form__label">
        Genre:
        <input
          {...register('genre', { required: 'Genre is required' })}
          className="movie-form__input"
        />
        {errors.genre && (
          <span className="movie-form__error">{errors.genre.message}</span>
        )}
      </label>

      <label className="movie-form__label">
        Rating:
        <input
          type="number"
          step="0.1"
          {...register('rating', {
            required: 'Rating is required',
            min: { value: 0, message: 'Rating must be between 0 and 10' },
            max: { value: 10, message: 'Rating must be between 0 and 10' },
          })}
          className="movie-form__input"
        />
        {errors.rating && (
          <span className="movie-form__error">{errors.rating.message}</span>
        )}
      </label>

      <label className="movie-form__label">
        Release Date:
        <input
          type="date"
          {...register('releaseDate', { required: 'Release date is required' })}
          className="movie-form__input"
        />
        {errors.releaseDate && (
          <span className="movie-form__error">
            {errors.releaseDate.message}
          </span>
        )}
      </label>

      <label className="movie-form__label">
        Image URL:
        <input
          {...register('image', {
            required: 'Image URL is required',
            pattern: {
              value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i,
              message: 'Must be a valid image URL (png, jpg, jpeg, gif)',
            },
          })}
          className="movie-form__input"
        />
        {errors.image && (
          <span className="movie-form__error">{errors.image.message}</span>
        )}
      </label>

      <button type="submit" className="movie-form__button">
        Create Movie
      </button>
    </form>
  );
};

export default MovieForm;
