// src/components/ImageCarousel.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ImageCarousel.css'; // Import the CSS file

function ImageCarousel({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  if (!images.length) {
    return <div className="no-images">No images to display</div>;
  }

  const currentImage = images[currentIndex];

  return (
    <div className="carousel-container">
      <img
        src={currentImage.imagePath} // URL of the image
        alt={currentImage.name}
        className="carousel-image"
      />
      <p className="carousel-caption">{currentImage.name}</p>
    </div>
  );
}

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      imagePath: PropTypes.string.isRequired, // URL of the image
      name: PropTypes.string.isRequired, // Name associated with the image
    })
  ).isRequired,
};

export default ImageCarousel;