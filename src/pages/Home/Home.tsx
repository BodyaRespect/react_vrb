import React, { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { Movie } from '../../types/Movie';
import { getMovies } from '../../api/axiosClient';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();

        setMovies(data);
      } catch {
        setError('Failed to load movies.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="home-page">
      <h1>All Movies</h1>

      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default Home;
