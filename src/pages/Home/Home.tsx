// components/Home.tsx
import React, { useEffect, useState, useCallback } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { Movie } from '../../types/Movie';
import { getMovies } from '../../api/axiosClient';
import AddMovieForm from '../../components/MovieForm/MovieForm';
import Loader from '../../components/Loader/Loader';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const toggleForm = () => {
    setShowForm(prevShowForm => !prevShowForm);
  };

  const handleMovieAdded = async () => {
    try {
      const data = await getMovies();

      setMovies(data);
    } catch {
      setError('Failed to load movies.');
    }
  };

  const handleMovieDeleted = useCallback((id: number) => {
    setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="page-error">{error}</p>;
  }

  return (
    <div className="home-page">
      <div className="home-page__topbar">
        <input
          className="search-input"
          type="text"
          placeholder="Search movie by title"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <button className="toggle-form-button" onClick={toggleForm}>
          {showForm ? 'Hide' : 'Add a movie'}
        </button>
      </div>

      {showForm ? (
        <AddMovieForm onMovieAdded={handleMovieAdded} />
      ) : filteredMovies.length === 0 ? (
        <p className="page-error">No movies found.</p>
      ) : (
        <>
          <h1>All Movies</h1>

          <MovieList
            movies={filteredMovies}
            onMovieDeleted={handleMovieDeleted}
          />
        </>
      )}
    </div>
  );
};

export default Home;
