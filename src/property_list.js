import React from 'react';
import propertyListings from './property_data';

function PropertyList() {
  return (
    <div>
      {propertyListings.map((property, index) => (
        <div key={index}>
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
