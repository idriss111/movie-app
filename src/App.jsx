import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Movie from './Movie/';
import { useEffect, useState } from 'react';
import Filter from './Filter';
import { motion, AnimatePresence } from 'framer-motion';
import Search from './Search/'

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Mjk5OTMwYTQxYjYzNmUzMDYyZDBlOWQ5OWRiMjc5OCIsIm5iZiI6MTc0NTA5NzY3MC4xOTYsInN1YiI6IjY4MDQxM2M2MzdhNzIyYjg4Njg5YjBiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PuAzuvmj9eacK2rTlfY2DpW_-dGL89gJCnfHKFhk2R4'
    }
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
    try {
      const response = await fetch  ('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
      const data = await response.json();
      console.log(data);
      setPopular(data.results);
      setFiltered(data.results);
    } catch (err) {
      console.error('Error:', err);
    }
  };
  // In your App.jsx
const handleSearch = (searchQuery) => {
  if (searchQuery.trim() === '') {
    setFiltered(popular); // Show all movies if empty search
    return;
  }

  const filteredMovies = popular.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredMovies.length === 0) {
    // You can set error state here if you prefer
    setFiltered([]); // Or show no results
  } else {
    setFiltered(filteredMovies);
  }
};



  



  return (
    <div className="App">
      <Search onSearch= {handleSearch} movies={popular}/>
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
        searchQuery={searchQuery}
      />
      
      <motion.div layout className="popular-movies">
        <AnimatePresence>
          {filtered.map((movie) => (
            <motion.div
              key={movie.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Movie movie={movie} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;