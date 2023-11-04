import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/SingleCity.css';

function SingleCity({ cityProp }) {
  const { aqi } = cityProp.data.list[0].main;
  let style = { fontWeight: '800', fontSize: '15px' };
  let airQuality = null;
  switch (aqi) {
    case 1:
      airQuality = 'Good';
      style = { ...style, color: '#04472c' };
      break;
    case 2:
      airQuality = 'Fair';
      style = { ...style, color: '#5affa5' };
      break;
    case 3:
      airQuality = 'Moderate';
      style = { ...style, color: '#f7f700' };
      break;
    case 4:
      airQuality = 'Poor';
      style = { ...style, color: '#f56163' };
      break;
    case 5:
      airQuality = 'Very Poor';
      style = { ...style, color: '#f70000' };
      break;
    default:
      airQuality = null;
  }

  return (
    <li className="single-city ">
      <Link to={`details/${cityProp.id}`} className="display-flex city-details">
        <h2>{cityProp.city}</h2>
        <p>
          Air Quality:
          <span style={style}>{airQuality}</span>
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
    id: PropTypes.string.isRequired,
    data: PropTypes.shape({
      list: PropTypes.arrayOf(
        PropTypes.shape({
          main: PropTypes.shape({
            aqi: PropTypes.number.isRequired,
          }).isRequired,
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
};
export default SingleCity;
