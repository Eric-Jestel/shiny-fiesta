// src/components/FileGallery.js
import React from 'react';
import PropTypes from 'prop-types';
import './FileGallery.css';

function FileGallery({ files }) {
  return (
    <div className="file-gallery">
      {files.map(file => (
        <div key={file.id} className="file-item">
          <img
            src={file.imagePath} // Ensure 'imagePath' contains the correct image URL
            alt={file.name}
            className="file-image"
          />
          <p className="file-name">{file.name}</p>
        </div>
      ))}
    </div>
  );
}

FileGallery.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      imagePath: PropTypes.string.isRequired, // Ensure 'imagePath' is used
    })
  ).isRequired,
};

export default FileGallery;