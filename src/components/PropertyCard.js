import React from 'react';
import { Link } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

// Component to display a single property card
const PropertyCard = ({ property, index, isFavorite, onToggleFavorite }) => {
  // Convert ID to string for draggableID
  const draggableId = property.id.toString();
  
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="card mb-3"
          style={{
            maxWidth: '800px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            margin: '0 auto',
            width: '100%',
            ...provided.draggableProps.style // Include the draggable style
          }}
        >
          {/* Link to property details page */}
          <Link 
            to={`/property/${property.id}`}
            className="text-decoration-none">
            <div
              style={{
                margin: '0 auto',
                overflow: 'hidden',
              }}
            >  </div>
            {/* Property image */}
            <img
              src={property.images[0]}
              className="card-img-top"
              alt={property.title}
              style={{
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
              }}
            />
          </Link>

          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              {/* Property title and favorite button */}
              <h5 className="card-title">{property.title}</h5>
              {/* Favorite button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onToggleFavorite(property);
                }}
                className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
              >
                ♥
              </button>
            </div>

            {/* Property short description */}
            <p className="card-text text-muted">
              {property.shortDescription}
            </p>

            <div className="d-flex justify-content-between align-items-center mt-3">
              {/* Property price */}
              <span className="h5 mb-0">£{property.price.toLocaleString()}</span>
              {/* Property postcode */}
              <span className="badge bg-secondary">{property.postcode}</span>
            </div>

            <div className="mt-3 pt-2 border-top">
              <div className="row text-muted small">
                <div className="col">
                  {/* Number of bedrooms */}
                  {property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </div>
                <div className="col text-end">
                  {/* Date added */}
                  Added: {new Date(property.dateAdded).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default PropertyCard;