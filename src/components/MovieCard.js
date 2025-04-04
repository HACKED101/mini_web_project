import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-link">
      <div className="movie-card">
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'} 
          alt={movie.Title} 
          className="movie-poster"
        />
        <h3 className="movie-title">{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
