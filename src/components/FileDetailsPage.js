import React from 'react';
import PropTypes from 'prop-types';
import './FileDetailsPage.css';

function FileDetailsPage({ file, onClose, addToCart }) {
  const handleAddToCart = () => {
    addToCart(file);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2 className="file-name-title">{file.name}</h2>
        <img src={file.imagePath} alt={file.name} className="modal-image" />
        <p className="file-price">${file.price.toFixed(2)}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

FileDetailsPage.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default FileDetailsPage;