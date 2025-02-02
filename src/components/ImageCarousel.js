import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './ImageCarousel.css';
import FileDetailsPage from './FileDetailsPage';

function ImageCarousel({ images = [], addToCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePrev = useCallback(() => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  const handleNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval);
  }, [handleNext]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  if (images.length === 0) {
    return <div className="no-images">No images to display</div>;
  }

  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  return (
    <div className="carousel-wrapper">
      {/* Left Arrow */}
      <button
        className="carousel-arrow left"
        onClick={handlePrev}
        aria-label="Previous Image"
      >
        &#10094;
      </button>

      {/* Carousel Container */}
      <div className="carousel-container">
        {/* Previous Image */}
        <div className="carousel-image" onClick={() => openModal(images[prevIndex])}>
          <img
            src={images[prevIndex].imagePath}
            alt={images[prevIndex].name}
            className="side-image"
          />
          <p className="carousel-caption">{images[prevIndex].name}</p>
        </div>

        {/* Current Image */}
        <div className="carousel-image" onClick={() => openModal(images[currentIndex])}>
          <img
            src={images[currentIndex].imagePath}
            alt={images[currentIndex].name}
            className="central-image"
          />
          <p className="carousel-caption">{images[currentIndex].name}</p>
        </div>

        {/* Next Image */}
        <div className="carousel-image" onClick={() => openModal(images[nextIndex])}>
          <img
            src={images[nextIndex].imagePath}
            alt={images[nextIndex].name}
            className="side-image"
          />
          <p className="carousel-caption">{images[nextIndex].name}</p>
        </div>
      </div>

      {/* Right Arrow */}
      <button
        className="carousel-arrow right"
        onClick={handleNext}
        aria-label="Next Image"
      >
        &#10095;
      </button>

      {/* File Details Modal */}
      {isModalOpen && selectedImage && (
        <FileDetailsPage
          file={selectedImage}
          onClose={closeModal}
          addToCart={addToCart}
        />
      )}
    </div>
  );
}

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      imagePath: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ImageCarousel;