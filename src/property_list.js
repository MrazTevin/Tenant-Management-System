import React from 'react';
import propertyListings from './property_data';
import './App.css';

function PropertyList() {
  return (
    <div className='property-grid'>
      {propertyListings.map((property, index) => (
        <div key={index} className='property-card'>
          <img src={property.image_url} alt={property.type} />
          <p>{property.type}</p>
          <p>{property.bedrooms} bedrooms</p>
          <p>Status: {property.status}</p>
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
