import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';
import SearchFilters from './SearchFilters';

function Sidebar({
  searchTerm,
  setSearchTerm,
  activeTags,
  setActiveTags,
  selectedGameSystem,
  setSelectedGameSystem,
  selectedFaction,
  setSelectedFaction,
  selectedArmies,
  setSelectedArmies,
  selectedTags,
  setSelectedTags,
  isOpen,
  setIsOpen
}) {
  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {isOpen && (
          <div className="sidebar-content">
            <SearchFilters
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
            />
          </div>
        )}
      </div>
      <div className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '❮' : '❯'}
      </div>
    </>
  );
}

Sidebar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  activeTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setActiveTags: PropTypes.func.isRequired,
  selectedGameSystem: PropTypes.string.isRequired,
  setSelectedGameSystem: PropTypes.func.isRequired,
  selectedFaction: PropTypes.string.isRequired,
  setSelectedFaction: PropTypes.func.isRequired,
  selectedArmies: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedArmies: PropTypes.func.isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedTags: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;