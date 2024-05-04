import React, { useState } from 'react';
import MoviePopup from './MoviePopup';

const MovieList = ({ movies, onMovieClick }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    // Close existing popup by setting selectedMovie to null
    setSelectedMovie(null);
  
    // Open the popup with the clicked movie
    setSelectedMovie(movie);
  };

  const handleClosePopup = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.ID} className="movie-item" onClick={() => handleMovieClick(movie)}>
          <img src={movie.image} alt={movie.name} className="movie-image" />
          <p className="movie-name">{movie.name}</p>
        </div>
      ))}
      <MoviePopup isOpen={!!selectedMovie} onClose={handleClosePopup} movie={selectedMovie} />
    </div>
  );
};

export default MovieList;
