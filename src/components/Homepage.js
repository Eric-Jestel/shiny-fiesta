// src/components/Homepage.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import ImageCarousel from './ImageCarousel';
import SearchFilters from './SearchFilters';
import FileGallery from './FileGallery';
import ErrorMessage from './ErrorMessage';
import { fetchProductImages } from '../services/SupabaseService';
import './Homepage.css';

function Homepage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTags, setActiveTags] = useState([]); // Changed from filters to activeTags
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

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

  const filteredFiles = files.filter(file => {
    // Filter by search term
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());

    // If no tags are active, ignore tag filtering
    if (activeTags.length === 0) {
      return matchesSearch;
    }

    // Check if file.tags includes all activeTags
    const matchesTags = activeTags.every(Tag => file.Tags.includes(Tag));

    return matchesSearch && matchesTags;
  });

  return (
    <div className="home-page">
      <Header />

      {/* Display error if any */}
      {error && <ErrorMessage message={error} />}

      {/* Image Carousel */}
      {files.length > 0 ? (
        <ImageCarousel images={files} />
      ) : (
        <p>Loading images...</p>
      )}

      {/* Search Filters */}
      <SearchFilters
        activeTags={activeTags}
        setActiveTags={setActiveTags}
      />

      {/* File Gallery */}
      <FileGallery files={filteredFiles} />
    </div>
  );
}

export default Homepage;