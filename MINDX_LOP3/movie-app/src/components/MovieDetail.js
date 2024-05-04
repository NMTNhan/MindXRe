import React from 'react';

const MovieDetail = ({ movie, onClose }) => {
  return (
    <div className="movie-detail">
      <button onClick={onClose}>Close</button>
      <h2>{movie.name}</h2>
      <p>Year: {movie.year}</p>
      <p>Duration: {movie.time} minutes</p>
      <p>{movie.introduce}</p>
    </div>
  );
};

export default MovieDetail;
