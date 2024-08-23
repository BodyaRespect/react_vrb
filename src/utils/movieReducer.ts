import { MovieActionTypes } from '../types/MovieActionTypes';
import { Movie } from '../types/Movie';

type State = {
  movie: Movie;
  formData: Movie;
  loading: boolean;
  error: string | null;
  isEditing: boolean;
};

type Action =
  | { type: MovieActionTypes.SET_MOVIE; payload: Movie }
  | { type: MovieActionTypes.UPDATE_MOVIE; payload: Movie }
  | { type: MovieActionTypes.SET_LOADING }
  | { type: MovieActionTypes.SET_ERROR; payload: string }
  | { type: MovieActionTypes.TOGGLE_EDIT_MODE };

const movieReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case MovieActionTypes.SET_MOVIE:
      return {
        ...state,
        movie: action.payload,
        formData: action.payload,
        loading: false,
      };
    case MovieActionTypes.UPDATE_MOVIE:
      return {
        ...state,
        formData: action.payload,
      };
    case MovieActionTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MovieActionTypes.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case MovieActionTypes.TOGGLE_EDIT_MODE:
      return {
        ...state,
        isEditing: !state.isEditing,
      };
    default:
      return state;
  }
};

export default movieReducer;
