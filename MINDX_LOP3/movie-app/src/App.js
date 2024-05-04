import React, { useState, useEffect } from 'react';
import NavigationBar from './components/NavigationBar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import MoviePopup from './components/MoviePopup';
import './styles/styles.css'; // Import consolidated CSS file
import moviesData from './data/movies.json';

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(moviesData);
  }, []);

  const openPopup = (movie) => {
    setSelectedMovie(movie);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedMovie(null);
    setIsPopupOpen(false);
  };

  return (
    <div className="app-container">
      <div className="main-container">
        <NavigationBar />
        <h1 className="app-title">Most Popular Movies</h1>
        <MovieList movies={movies} onMovieClick={openPopup} />
        {selectedMovie && (
          <MovieDetail movie={selectedMovie} onClose={closePopup} />
        )}
        {isPopupOpen && (
          <MoviePopup isOpen={isPopupOpen} onClose={closePopup} movie={selectedMovie} />
        )}
      </div>
    </div>
  );
};

export default App;
