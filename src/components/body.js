import MovieCard from "./card";
import { searchMovies } from "./model.js";
import { useEffect, useState } from "react";

const API_KEY = 'd6c0f2218f478482c048cb88af482063'; // Replace with your TMDB API Key
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // TMDB image base URL

function Body() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("All time best tollywood");
  const [tempQuery, setTempQuery] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError(null);

      try {
        const data = await searchMovies(searchQuery);
        console.log('Movies data:', data);

        const updatedMovies = await Promise.all(
          data.map(async (movie) => {
            try {
              const movieName = movie.movieName || movie.title;
              if (!movieName) {
                console.error("Movie name missing:", movie);
                return { ...movie, posterUrl: 'https://via.placeholder.com/500x750?text=No+Poster+Available' };
              }

              const movieSearchResponse = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`
              );

              if (!movieSearchResponse.ok) {
                throw new Error(`Failed to fetch movie search results for ${movieName}`);
              }

              const searchData = await movieSearchResponse.json();

              if (searchData.results && searchData.results.length > 0) {
                const movieData = searchData.results[0];
                const posterUrl = movieData.poster_path
                  ? `${IMAGE_BASE_URL}${movieData.poster_path}`
                  : 'https://via.placeholder.com/500x750?text=No+Poster+Available';

                return {
                  ...movie,
                  posterUrl,
                };
              } else {
                console.error(`No results found for movie: ${movieName}`);
                return { ...movie, posterUrl: 'https://via.placeholder.com/500x750?text=No+Poster+Available' };
              }
            } catch (error) {
              console.error(`Failed to fetch poster for movie ${movie.movieName || movie.title}:`, error);
              return { ...movie, posterUrl: 'https://via.placeholder.com/500x750?text=No+Poster+Available' };
            }
          })
        );

        setMovies(updatedMovies);
      } catch (error) {
        console.error('Error:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [searchQuery]);

  return (
    <div className={loading ? "loading-effect" : ""}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={tempQuery}
          onChange={(e) => setTempQuery(e.target.value)}
        />
        <button onClick={() => setSearchQuery(tempQuery)}>Search</button>
      </div>

      {error && <div className="error-message">Error: {error}</div>}

      <div className="movie-list">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.movieName || movie.title}
            genre={movie.genre}
            year={movie.releaseYear}
            description={movie.bio}
            posterUrl={movie.posterUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default Body;
