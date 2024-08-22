import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import MovieList from '../../components/MovieList/MovieList';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data: React.SetStateAction<Movie[]> = [];

        setFavorites(data);
      } catch {
        setError('Failed to load favorites.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="favorites">
      <h1>Favorite Movies</h1>
      {favorites.length === 0 ? (
        <p>No favorite movies found.</p>
      ) : (
        <MovieList movies={favorites} />
      )}
    </div>
  );
};

export default Favorites;
