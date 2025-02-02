// src/components/FileGallery.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './FileGallery.css';
import FileDetailsPage from './FileDetailsPage';

function FileGallery({ files, searchTerm, activeTags, selectedGameSystem, selectedFaction, selectedArmies, selectedTags, addToCart, isFileDetailsOpen, setIsFileDetailsOpen }) { // Added isFileDetailsOpen and setIsFileDetailsOpen props
  const [selectedFile, setSelectedFile] = useState(null);

  const openModal = (file) => {
    setSelectedFile(file);
    setIsFileDetailsOpen(true);
  };

  const closeModal = () => {
    setSelectedFile(null);
    setIsFileDetailsOpen(false);
  };

  const filteredFiles = files.filter(file => {
    const tagsArray = file.tags.split(',').map(tag => tag.trim().toLowerCase());
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGameSystem = !selectedGameSystem || tagsArray.includes(selectedGameSystem.toLowerCase());
    const matchesFaction = !selectedFaction || tagsArray.includes(selectedFaction.toLowerCase());
    const matchesArmies = selectedArmies.length === 0 || selectedArmies.every(army => tagsArray.includes(army.toLowerCase()));
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => tagsArray.includes(tag.toLowerCase()));

    if (activeTags.length === 0) {
      return matchesSearch && matchesGameSystem && matchesFaction && matchesArmies && matchesTags;
    }

    const matchesActiveTags = activeTags.every(tag => tagsArray.includes(tag.toLowerCase()));

    return matchesSearch && matchesActiveTags && matchesGameSystem && matchesFaction && matchesArmies && matchesTags;
  });

  return (
    <div className="file-gallery">
      {filteredFiles.map(file => (
        <div key={file.id} className="file-item" onClick={() => openModal(file)}>
          <img
            src={file.imagePath}
            alt={file.name}
            className="file-image"
          />
          <p className="file-name">{file.name}</p>
        </div>
      ))}

      {isFileDetailsOpen && selectedFile && (
        <FileDetailsPage
          file={selectedFile}
          onClose={closeModal}
          addToCart={addToCart} // Passed addToCart to FileDetailsPage
        />
      )}
    </div>
  );
}

FileGallery.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      imagePath: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
      price: PropTypes.number.isRequired, // Ensure price is included
      gameSystem: PropTypes.string,
      faction: PropTypes.string,
      army: PropTypes.string,
    })
  ).isRequired,
  searchTerm: PropTypes.string.isRequired, // Added prop type
  activeTags: PropTypes.arrayOf(PropTypes.string).isRequired, // Added prop type
  selectedGameSystem: PropTypes.string.isRequired, // Added prop type
  selectedFaction: PropTypes.string.isRequired, // Added prop type
  selectedArmies: PropTypes.arrayOf(PropTypes.string).isRequired, // Added prop type
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired, // Added prop type
  addToCart: PropTypes.func.isRequired, // Added prop type
  isFileDetailsOpen: PropTypes.bool.isRequired, // Added prop type
  setIsFileDetailsOpen: PropTypes.func.isRequired, // Added prop type
};

export default FileGallery;