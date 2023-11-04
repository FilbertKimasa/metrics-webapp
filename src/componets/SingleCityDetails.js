/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useParams, Link } from 'react-router-dom';
import '../styles/SingleCityetails.css';

function SingleCityDetails() {
  const cityObject = useSelector((state) => state.cities);
  const { id } = useParams();
  const singleCity = cityObject.citiesData.filter((cityData) =>
    cityData.id.includes(id),
  );
  const AirComponents = singleCity[0].data.list[0].components;
  return (
    <div className="details-container">
      <header className="details-header">
        <Link to="/">
          <i className="material-icons back-arrow">chevron_left</i>
        </Link>
        <h2 className="city-name">{singleCity[0].city}</h2>
      </header>

      <h3>
        Air components composition in
        {singleCity[0].city}
      </h3>
      <p>Components concentation in μg/m3</p>
      <ul>
        {Object.entries(AirComponents).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SingleCityDetails;
