import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import "./App.css"

function App() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState([]);

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
        {movies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          movies.map(movie => (
            <div className='movie' key={movie.id}>
              <img src={movie.posterUrl} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.releaseDate}</p>
              <p>Rating: {movie.rating}</p>
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
