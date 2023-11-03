import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SingleCity({ cityProp }) {
  const { aqi } = cityProp.data.list[0].main;
  let airQuality = null;
  switch (aqi) {
    case 1:
      airQuality = 'Good';
      break;
    case 2:
      airQuality = 'Fair';
      break;
    case 3:
      airQuality = 'Moderate';
      break;
    case 4:
      airQuality = 'Poor';
      break;
    case 5:
      airQuality = 'Very Poor';
      break;
    default:
      airQuality = null;
  }

  return (
    <li>
      <Link to={`details/${cityProp.id}`}>
        <h2>{cityProp.city}</h2>
        <p>
          Air Quality:
          {airQuality}
        </p>
        <p>
          Quality Index:
          {aqi}
        </p>
      </Link>
    </li>
  );
}

SingleCity.propTypes = {
  cityProp: PropTypes.shape({
    city: PropTypes.string.isRequired,
    data: PropTypes.objectOf(PropTypes.string).isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default SingleCity;
