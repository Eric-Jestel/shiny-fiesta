// src/components/SearchFilters.js
import React from 'react';
import PropTypes from 'prop-types';
import './SearchFilters.css';

const AVAILABLE_TAGS = [
  'Warhammer',
  'Age of Sigmar',
  'Imperium',
  'Chaos',
  'Xenos',
  'Infantry',
  'Vehicle',
];

function SearchFilters({ activeTags, setActiveTags }) {
  const toggleTag = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(activeTag => activeTag !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  return (
    <div className="search-filters">
      <div className="tag-buttons">
        {AVAILABLE_TAGS.map(tag => (
          <button
            key={tag}
            type="button"
            className={`tag-button ${activeTags.includes(tag) ? 'active' : ''}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

SearchFilters.propTypes = {
  activeTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setActiveTags: PropTypes.func.isRequired,
};

export default SearchFilters;