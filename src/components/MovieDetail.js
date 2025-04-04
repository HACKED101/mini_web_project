import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerId, setTrailerId] = useState('');

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=22be0fba`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        fetchTrailer(data.Title); 
      });
  }, [id]);

  const fetchTrailer = (title) => {
    const query = `${title} official trailer`;
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(query)}&key=AIzaSyD5CF6SiFoH5HV65dhF6ibBHd-MgupXxuI`)
      .then(res => res.json())
      .then(data => {
        if (data.items && data.items.length > 0) {
          setTrailerId(data.items[0].id.videoId);
        }
      });
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div 
      style={{
        
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '2rem',
        color: 'white',
      }}
    >
      <div 
        style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '2rem',
          borderRadius: '15px',
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
          alt={movie.Title}
          style={{
            width: '300px',
            borderRadius: '10px',
            marginBottom: '20px'
          }}
        />
        <h2>{movie.Title}</h2>
        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Plot:</strong> {movie.Plot}</p>

        {trailerId && (
          <div style={{ marginTop: '20px' }}>
            <h3>Trailer</h3>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${trailerId}`}
              title="YouTube Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
