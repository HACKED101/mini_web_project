import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const location = useLocation(); 

  return (
    <div className="App">
      <h1 className='heading'>Movie Mania</h1>

      <SearchBar onSearch={setMovies} resetTrigger={location.pathname} />

      <Routes>
        <Route
          path="/"
          element={
            <div className="movie-list">
              {movies.map(movie => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          }
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
