import React from 'react';
import map from '../assets/images/africa-map.png';

function Heading() {
  return (
    <div>
      <img src={map} alt="map" />
      <p>Air Quality In Some Africa Big Cities.</p>
    </div>
  );
}

export default Heading;
