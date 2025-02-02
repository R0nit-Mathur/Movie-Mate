function MovieCard({ title, genre, year, description, posterUrl }) {
    return (
      <div className="movie-card">
        <img src={posterUrl} alt={title} className="movie-poster" />
        <div className="movie-content">
          <h2 className="movie-title">{title}</h2>
          <p className="movie-genre">{genre} • {year}</p>
          <p className="movie-description">{description}</p>
          <button className="movie-btn">View Details</button>
        </div>
      </div>
    );
  }
  
  export default MovieCard;
  