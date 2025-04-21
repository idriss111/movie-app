import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function Search({ onSearch, movies }) { // Make sure to receive movies prop
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Reset error before validation
    
    // Validate empty query
    if (query.trim() === '') {
      setError("Please enter something to search");
      return;
    }

    // Search logic moved to parent component (better practice)
    onSearch(query.trim());
  };

  return (
    <div className="search-header">
      <div className="app-title">
        <h1>MovieFinder</h1>
      </div>
      <form onSubmit={handleSubmit} className="search-bar">
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setError(''); // Clear error when typing
            }}
            placeholder="Search movies..."
            className="search-input"
            style={{ borderColor: error ? 'red' : '' }} 
          />
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Search;