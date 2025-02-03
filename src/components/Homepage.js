// src/components/Homepage.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import ImageCarousel from './ImageCarousel';
import FileGallery from './FileGallery';
import ErrorMessage from './ErrorMessage';
import Cart from './Cart';
import Sidebar from './Sidebar';
import { fetchProductImages } from '../services/SupabaseService';
import './Homepage.css';

function Homepage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isFileDetailsOpen, setIsFileDetailsOpen] = useState(false);
  const [selectedGameSystem, setSelectedGameSystem] = useState('');
  const [selectedFaction, setSelectedFaction] = useState('');
  const [selectedArmies, setSelectedArmies] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function getFiles() {
      try {
        const bucketFiles = await fetchProductImages();
        setFiles(bucketFiles);
        console.log('Fetched files:', bucketFiles);
      } catch (err) {
        setError('Failed to fetch files. Please try again later.');
        console.error('Error fetching files:', err);
      }
    }

    getFiles();
  }, []);

  const addToCart = (file) => {
    if (!cartItems.find(item => item.id === file.id)) {
      setCartItems([...cartItems, { id: file.id, name: file.name, price: file.price, filePath: file.filePath }]);
    }
  };

  const handleToggleCart = () => {
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
    <div className="home-page">
      <Header />

      <Sidebar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTags={activeTags}
        setActiveTags={setActiveTags}
        selectedGameSystem={selectedGameSystem}
        setSelectedGameSystem={setSelectedGameSystem}
        selectedFaction={selectedFaction}
        setSelectedFaction={setSelectedFaction}
        selectedArmies={selectedArmies}
        setSelectedArmies={setSelectedArmies}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <Cart
        cartItems={cartItems}
        setCartItems={setCartItems}
        onToggleCart={handleToggleCart}
      />

      {error && <ErrorMessage message={error} />}

      {files.length > 0 ? (
        <ImageCarousel
          images={files}
          addToCart={addToCart}
          isFileDetailsOpen={isFileDetailsOpen}
          setIsFileDetailsOpen={setIsFileDetailsOpen}
        />
      ) : (
        <p>Loading images...</p>
      )}

      <FileGallery
        files={filteredFiles}
        searchTerm={searchTerm}
        activeTags={activeTags}
        selectedGameSystem={selectedGameSystem}
        selectedFaction={selectedFaction}
        selectedArmies={selectedArmies}
        selectedTags={selectedTags}
        addToCart={addToCart}
        isFileDetailsOpen={isFileDetailsOpen}
        setIsFileDetailsOpen={setIsFileDetailsOpen}
      />
    </div>
  );
}

export default Homepage;