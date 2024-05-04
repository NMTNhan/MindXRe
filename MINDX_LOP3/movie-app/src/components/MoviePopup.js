import React from 'react';
import Modal from 'react-modal';
import '../styles/styles.css'; // Import styles

const MoviePopup = ({ isOpen, onClose, movie }) => {
  if (!movie) {
    return null; // Render nothing if movie is null
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Movie Details"
      ariaHideApp={false} // Disable aria-hidden warning
      className="movie-popup" // Apply custom class for styling
      overlayClassName="modal-overlay" // Apply custom overlay styles
    >
      <div className="popup-container">
        <div className="popup-content">
          <div className="poster-container">
            <img src={movie.image} alt={movie.name} className="movie-poster" />
          </div>
          <div className="info-container">
            <h2>{movie.name}</h2>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Runtime:</strong> {movie.time} minutes</p>
            <p>{movie.introduce}</p>
            <button onClick={onClose} className="close-button">Close</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MoviePopup;
