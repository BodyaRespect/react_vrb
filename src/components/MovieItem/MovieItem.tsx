import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types/Movie';

type Props = {
  movie: Movie;
};

const MovieItem: React.FC<Props> = ({ movie }) => (
  <div className="card">
    <div className="card__content">
      <div className="card__image">
        <img src={movie.image} alt={movie.title} className="card__picture" />
      </div>

      <div className="card__info">
        <h3 className="card__name">{movie.title}</h3>

        <div className="card__shipping">
          <div className="card__shipping-price">{movie.rating}</div>

          <Link to={`/movie/${movie.id}`} className="card__button">
            View Details
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default MovieItem;
