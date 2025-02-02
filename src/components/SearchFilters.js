import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './SearchFilters.css';

const CATEGORIES = {
  gameSystems: [
    {
      name: 'Warhammer',
      factions: [
        {
          name: 'Imperium',
          armies: ['Space Marine', 'Astra Militarum', 'Grey Knight', 'Imperial Knight'],
        },
        {
          name: 'Chaos',
          armies: ['Chaos Space Marine', 'Death Guard', 'Thousand Sons', 'Chaos Knight'],
        },
        {
          name: 'Xenos',
          armies: ['Tyrannid', 'Ork', 'Tau', 'Eldar', 'Necron'],
        },
      ],
    },
    {
      name: 'Age of Sigmar',
      factions: [
        {
          name: 'Order',
          armies: ['Stormcast Eternals', 'Sylvaneth', 'Seraphon'],
        },
        {
          name: 'Chaos',
          armies: ['Slaves to Darkness', 'Khorne', 'Nurgle'],
        },
        {
          name: 'Death',
          armies: ['Soulblight Gravelords', 'Nighthaunt'],
        },
        {
          name: 'Destruction',
          armies: ['Orruk Warclans', 'Gloomspite Gitz'],
        },
      ],
    },
  ],
};

const TAGS = [
  'Out of Print',
  'Limited Edition',
  'Scan'
];

function SearchFilters({
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
  setSelectedTags
}) {
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);
  const [isArmiesDropdownOpen, setIsArmiesDropdownOpen] = useState(false);
  const tagsDropdownRef = useRef(null);
  const armiesDropdownRef = useRef(null);

  const toggleTagsDropdown = () => {
    setIsTagsDropdownOpen(!isTagsDropdownOpen);
    setIsArmiesDropdownOpen(false);
  };

  const toggleArmiesDropdown = () => {
    setIsArmiesDropdownOpen(!isArmiesDropdownOpen);
    setIsTagsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (tagsDropdownRef.current && !tagsDropdownRef.current.contains(event.target)) {
      setIsTagsDropdownOpen(false);
    }
    if (armiesDropdownRef.current && !armiesDropdownRef.current.contains(event.target)) {
      setIsArmiesDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-filters">
      <div className="filter-group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search files..."
          className="search-bar-input"
        />
      </div>
      <div className="filter-group">
        <select
          value={selectedGameSystem}
          onChange={(e) => setSelectedGameSystem(e.target.value)}
        >
          <option value="">Select Game System</option>
          {CATEGORIES.gameSystems.map((system) => (
            <option key={system.name} value={system.name}>
              {system.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <select
          value={selectedFaction}
          onChange={(e) => setSelectedFaction(e.target.value)}
        >
          <option value="">Select Faction</option>
          {CATEGORIES.gameSystems
            .find((system) => system.name === selectedGameSystem)?.factions.map((faction) => (
              <option key={faction.name} value={faction.name}>
                {faction.name}
              </option>
            ))}
        </select>
      </div>
      <div className="armies-dropdown" ref={armiesDropdownRef}>
        <div className="armies-dropdown-button" onClick={toggleArmiesDropdown}>
          {selectedArmies.length > 0 ? selectedArmies[0] : 'Select Armies'}
        </div>
        <div className={`armies-dropdown-content ${isArmiesDropdownOpen ? 'show' : ''}`}>
          {CATEGORIES.gameSystems
            .find((system) => system.name === selectedGameSystem)?.factions
            .find((faction) => faction.name === selectedFaction)?.armies.map((army) => (
              <div
                key={army}
                className={`army-item ${selectedArmies.includes(army) ? 'selected' : ''}`}
                onClick={() => setSelectedArmies(
                  selectedArmies.includes(army) ? [] : [army]
                )}
              >
                {army}
                {selectedArmies.includes(army) && <span className="checkmark">✔</span>}
              </div>
            ))}
        </div>
      </div>
      <div className="tags-dropdown" ref={tagsDropdownRef}>
        <div className="tags-dropdown-button" onClick={toggleTagsDropdown}>
          Select Tags
        </div>
        <div className={`tags-dropdown-content ${isTagsDropdownOpen ? 'show' : ''}`}>
          {TAGS.map((tag) => (
            <div
              key={tag}
              className={`tag-item ${selectedTags.includes(tag) ? 'selected' : ''}`}
              onClick={() => setSelectedTags(
                selectedTags.includes(tag)
                  ? selectedTags.filter((t) => t !== tag)
                  : [...selectedTags, tag]
              )}
            >
              {tag}
              {selectedTags.includes(tag) && <span className="checkmark">✔</span>}
            </div>
          ))}
        </div>
      </div>
      <button
        className="clear-filters-button"
        onClick={() => {
          setSearchTerm('');
          setActiveTags([]);
          setSelectedGameSystem('');
          setSelectedFaction('');
          setSelectedArmies([]);
          setSelectedTags([]);
        }}
      >
        Clear Filters
      </button>
    </div>
  );
}

SearchFilters.propTypes = {
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
};

export default SearchFilters;