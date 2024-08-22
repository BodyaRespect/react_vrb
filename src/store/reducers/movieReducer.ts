import { Movie } from '../../types/Movie';

type MovieState = {
  movie: Movie;
  formData: Movie;
  loading: boolean;
  error: string | null;
  isEditing: boolean;
};

type MovieAction =
  | { type: 'TOGGLE_EDIT_MODE' }
  | { type: 'UPDATE_MOVIE'; payload: Partial<Movie> }
  | { type: 'SET_MOVIE'; payload: Movie }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING' };

const movieReducer = (state: MovieState, action: MovieAction): MovieState => {
  switch (action.type) {
    case 'TOGGLE_EDIT_MODE':
      return { ...state, isEditing: !state.isEditing };
    case 'UPDATE_MOVIE':
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case 'SET_MOVIE':
      return {
        ...state,
        movie: action.payload,
        formData: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default movieReducer;
