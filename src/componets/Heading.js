import React from 'react';
import map from '../assets/images/africa-map.png';
import '../styles/Heading.css';

function Heading() {
  return (
    <div className="display-grid">
      <img src={map} alt="map" className="map" />
      <p className="heading">Air Quality In Some African Big Cities</p>
    </div>
  );
}

export default Heading;
