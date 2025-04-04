import { useEffect, useState } from 'react';

const SearchBar = ({ onSearch, resetTrigger }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=22be0fba`)
      .then(res => res.json())
      .then(data => {
        onSearch(data.Search || []);
      });
  };

  useEffect(() => {
    setQuery('');
  }, [resetTrigger]);

  return (
    <div className="search-bar">
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search movies..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
