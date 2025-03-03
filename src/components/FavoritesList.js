import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PropertyCard from './PropertyCard';

//component to display the list of favorite properties
const FavoritesList = ({ favorites, onToggleFavorite, onClearFavorites }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  //Handle clear all favorites
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      // Call the function passed from parent to clear all favorites
      onClearFavorites();
    }
  };

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <div className="favorites-title">
          <h2 className="title-text">Favorites</h2>
          <span className="favorites-count">
            {favorites.length}
          </span>
        </div>
        <div className="favorites-actions">
          {/* Clear all favorites button */}
          <button
            onClick={handleClearAll}
            className="clear-all-btn"
            disabled={favorites.length === 0}
          >
            <i className="fas fa-trash-alt me-2"></i>
            Clear All
          </button>
          {/* Button to expand/collapse favorites */}
          <button
            className="expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '▼' : '▲'}
          </button>
        </div>
      </div>
      
      {/* Content section with the list of favorite properties */}
      <div className={`favorites-content ${isExpanded ? 'expanded' : ''}`}>
        <Droppable droppableId="favorites">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="favorites-list"
            >
              {favorites.length === 0 ? (
                // Display empty state if there are no favorites
                <div className="empty-state">
                  <p>No favorites yet</p>
                  <p className="empty-state-subtitle">
                    Drag properties here or click the heart icon to add to favorites
                  </p>
                </div>
              ) : (
                // Display the list of favorite properties
                favorites.map((property, index) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    index={index}
                    isFavorite={true}
                    onToggleFavorite={onToggleFavorite}
                    compact={true}
                  />
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default FavoritesList;