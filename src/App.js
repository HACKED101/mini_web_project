import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link, useParams } from 'react-router-dom';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <h1 className='heading'>Movie Mania</h1>
        <SearchBar onSearch={setMovies} />
        <div className="movie-list">
          {movies.map(movie => (
            <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
              <MovieCard movie={movie} />
            </Link>
          ))}
        </div>

        <Routes>
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=22be0fba`);
        if (!response.ok) throw new Error('Failed to fetch movie details');
        const data = await response.json();
        if (data.Response === 'False') throw new Error(data.Error);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading movie details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="movie-details">
      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
    </div>
  );
}

export default App;
