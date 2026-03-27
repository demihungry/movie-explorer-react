import { useState, useEffect } from 'react'
import "./App.css"

function App() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  async function fetchMovies() {
    try {
      let url ="";
      if (search.trim()) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(search)}&page=${currentPage}`;
      } else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${currentPage}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setMovies(data.results || []);
      setTotalPages(Math.min(data.total_pages, 48963) || 1);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
      setTotalPages(1);
    }

  }

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage, search]);

  const sortedMovies = [...movies].sort((a, b) => {
    if (sort === 'releaseAsc') {
      return new Date(a.release_date) - new Date(b.release_date);
    } else if (sort === 'releaseDesc') {
      return new Date(b.release_date) - new Date(a.release_date);
    } else if (sort === 'ratingAsc') {
      return a.vote_average - b.vote_average;
    } else if (sort === 'ratingDesc') {
      return b.vote_average - a.vote_average;
    }
    return 0;
  });

  return (
    <div>
      {/* Header */}
      <div className='header'>
        <h1>Movie Explorer</h1>
      </div>

      {/* search and sort */}
      <div className='search'>
        <input 
          type="text" 
          placeholder='Search for movies...' 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="releaseAsc">Release Date (Asc)</option>
          <option value="releaseDesc">Release Date (Desc)</option>
          <option value="ratingAsc">Rating (Asc)</option>
          <option value="ratingDesc">Rating (Desc)</option>
        </select>
      </div>

      {/* Movie List */}
      <div className='movie-list'>
        {sortedMovies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          sortedMovies.map(movie => (
            <div className='movie' key={movie.id}>
              <img src={movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/170x250?text=No+Image'
              } alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date || 'N/A'}</p>
              <p>Rating: {movie.vote_average || 'N/A'}</p>
            </div>
          ))
        )
          }
      </div>

      <div className='pages'>
        <button onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        }}>
          Previous
        </button>

        <p>Page {currentPage} of {totalPages}</p>
        <button onClick={() => {
          if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
          }
        }}>
          Next
        </button>
      </div>

    </div>
  );
}

export default App;
