/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { Movie } from '../types/Movie';

const API_BASE_URL = 'http://localhost:5700';

export const getMovies = (): Promise<Movie[]> => {
  return axios
    .get<Movie[]>(`${API_BASE_URL}/movies/`)
    .then(response => response.data)
    .catch(() => {
      throw new Error('Error fetching movies');
    });
};

export const getMovieById = (id: number): Promise<Movie> => {
  return axios
    .get<Movie>(`${API_BASE_URL}/movies/${id}`)
    .then(response => response.data)
    .catch(() => {
      throw new Error('Error fetching movie');
    });
};

export const addMovie = (movie: Omit<Movie, 'id'>): Promise<Movie> => {
  return axios
    .post<Movie>(`${API_BASE_URL}/movies`, movie)
    .then(response => response.data)
    .catch(() => {
      throw new Error('Error adding movie');
    });
};

export const updateMovie = (
  id: number,
  movie: Partial<Movie>,
): Promise<Movie> => {
  return axios
    .patch<Movie>(`${API_BASE_URL}/movies/${id}`, movie)
    .then(response => response.data)
    .catch(() => {
      throw new Error('Error updating movie');
    });
};

export const deleteMovie = (id: string): Promise<void> => {
  return axios
    .delete(`${API_BASE_URL}/movies/${id}`)
    .then(() => {})
    .catch(() => {
      throw new Error('Error deleting movie');
    });
};
