const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const moviesData = require('../movie-app/src/data/movies.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// API to list all movies
app.get('/api/movies', (req, res) => {
  res.json(moviesData);
});

// API to find movie by ID
app.get('/api/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const foundMovie = moviesData.find(movie => movie.ID === movieId);

  if (!foundMovie) {
    return res.status(404).json({ error: 'Movie not found.' });
  }

  res.json(foundMovie);
});

// API to add a movie
app.post('/api/movies', (req, res) => {
  const newMovie = req.body;

  if (!newMovie || !newMovie.name || !newMovie.year || !newMovie.image || !newMovie.introduce) {
    return res.status(400).json({ error: 'Please provide all required fields (name, year, image, introduce).' });
  }

  // Give movie new unique ID
  const lastMovieId = moviesData[moviesData.length - 1].ID;
  newMovie.ID = lastMovieId + 1;

  moviesData.push(newMovie);
  fs.writeFileSync('./src/data/movies.json', JSON.stringify(moviesData, null, 2));

  res.status(201).json(newMovie);
});

// API to update movie
app.put('/api/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const updatedMovie = req.body;

  const existingMovieIndex = moviesData.findIndex(movie => movie.ID === movieId);

  if (existingMovieIndex === -1) {
    return res.status(404).json({ error: 'Movie not found.' });
  }

  moviesData[existingMovieIndex] = { ...moviesData[existingMovieIndex], ...updatedMovie };
  fs.writeFileSync('./src/data/movies.json', JSON.stringify(moviesData, null, 2));

  res.json(moviesData[existingMovieIndex]);
});

// API to update movie image
app.put('/api/movies/:id/image', (req, res) => {
    const movieId = parseInt(req.params.id);
    const { imageUrl } = req.body;
  
    // Find the movie by ID
    const movie = moviesData.find((movie) => movie.ID === movieId);
  
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
  
    // Update the movie image URL
    movie.image = imageUrl;
  
    return res.json({ message: 'Movie image updated successfully', movie });
  });

// API to delete movie
app.delete('/api/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);

  const filteredMovies = moviesData.filter(movie => movie.ID !== movieId);

  if (filteredMovies.length === moviesData.length) {
    return res.status(404).json({ error: 'Movie not found.' });
  }

  fs.writeFileSync('./src/data/movies.json', JSON.stringify(filteredMovies, null, 2));

  res.json({ message: 'Movie deleted successfully.' });
});

// API to search movie by name
app.get('/api/movies/search', (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Movie name is required in the query parameters.' });
  }

  const foundMovie = moviesData.find(movie => movie.name.toLowerCase() === name.toLowerCase());

  if (!foundMovie) {
    return res.status(404).json({ error: 'Movie not found.' });
  }

  res.json(foundMovie);
});

// API to sort by year
app.get('/api/movies/sort', (req, res) => {
  const { sortBy } = req.query;

  if (!sortBy) {
    return res.status(400).json({ error: 'Sort criteria is required in the query parameters.' });
  }

  let sortedMovies = [...moviesData];

  switch (sortBy) {
    case 'year':
      sortedMovies.sort((a, b) => a.year - b.year);
      break;

    default:
      return res.status(400).json({ error: 'Invalid sort criteria.' });
  }

  res.json(sortedMovies);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
