import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import '../styles/SingleCityetails.css';

function SingleCityDetails() {
  const cityObject = useSelector((state) => state.cities);
  const { id } = useParams();
  const singleCity = cityObject.citiesData.filter((cityData) => cityData.id.includes(id));
  const AirComponents = singleCity.length > 0 ? singleCity[0].data.list[0].components : {};

  return (
    <div className="details-container">
      <header className="details-header">
        <Link to="/">
          <i className="material-icons back-arrow">chevron_left</i>
        </Link>
        <h2 className="city-name">
          {singleCity.length > 0 ? singleCity[0].city : ''}
        </h2>
      </header>

      {singleCity.length > 0 ? (
        <>
          <h3 className="title">
            Air components composition in
            {' '}
            <span>{singleCity[0].city}</span>
          </h3>
          <p className="sub-title">Components concentration in μg/m3</p>
          <ul className="components-list ">
            {Object.entries(AirComponents).map(([key, value]) => (
              <li key={key} className="component-item">
                <strong>{key}</strong>
                {' '}
                <strong>{value}</strong>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

export default SingleCityDetails;
