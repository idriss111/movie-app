import { useEffect } from "react";

function Filter({ 
  setActiveGenre, 
  activeGenre, 
  setFiltered, 
  popular,
  searchQuery // Make sure to receive searchQuery as prop
}) {
  useEffect(() => {
    let filteredMovies = [...popular];
    
    // Apply genre filter if not "All" (0)
    if (activeGenre !== 0) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.genre_ids.includes(activeGenre)
      );
    }
    
    // Apply search filter if search query exists
    if (searchQuery && searchQuery.trim() !== '') {
      filteredMovies = filteredMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFiltered(filteredMovies);
  }, [activeGenre, popular, searchQuery]); // Include all dependencies

  return (
    <div className="filter-container">
      <button
        className={activeGenre === 0 ? "active" : ""}
        onClick={() => setActiveGenre(0)}
      >
        All
      </button>
      <button
        className={activeGenre === 35 ? "active" : ""}
        onClick={() => setActiveGenre(35)}
      >
        Comedy
      </button>
      <button
        className={activeGenre === 28 ? "active" : ""}
        onClick={() => setActiveGenre(28)}
      >
        Action
      </button>
    </div>
  );
}

export default Filter;