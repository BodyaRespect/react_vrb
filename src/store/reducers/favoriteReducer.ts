/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../../types/Movie';

export interface FavoritesState {
  favoriteMovies: Movie[];
}

const initialState: FavoritesState = {
  favoriteMovies: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      state.favoriteMovies.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        movie => movie.id !== action.payload,
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
