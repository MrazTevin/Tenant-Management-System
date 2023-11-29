import React from 'react';
import propertyListings from './property_data';
import './App.css';

function PropertyList() {
  return (
    <div className='property-list'>
      {propertyListings.map((property, index) => (
        <div key={index} className='property-card'>
          <div className='property-image'>
            <img src={property.image_url} alt={property.type} />
          </div>
          <div className='property-info'>
            <div className='property-details'>
              <p>{property.type}</p>
              <p>{property.bedrooms} bedrooms</p>
              <p>Status: {property.status}</p>
            </div>
          </div>
          <div className='property-button'>
            <button>View Details</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
