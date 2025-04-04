
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const searchMovies = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=22be0fba`
      );
      const data = await response.json();
      onSearch(data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <form onSubmit={searchMovies}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;