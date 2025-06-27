import React from 'react';
import '../styles/SearchBox.css';

const SearchBox = ({ query, setQuery, handleSearch, units, toggleUnits }) => {
  return (
    <div className="search-box">
      <form onSubmit={handleSearch}>
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
        
        <div className="units-toggle">
          <button 
            type="button" 
            className={`unit-button ${units === 'metric' ? 'active' : ''}`}
            onClick={toggleUnits}
          >
            °C
          </button>
          <button 
            type="button" 
            className={`unit-button ${units === 'imperial' ? 'active' : ''}`}
            onClick={toggleUnits}
          >
            °F
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox; 