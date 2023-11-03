/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useParams } from 'react-router-dom';

function SingleCityDetails() {
  const cityObject = useSelector((state) => state.cities);
  const { id } = useParams();
  const singleCity = cityObject.citiesData.filter((cityData) =>
    cityData.id.includes(id),
  );
  const AirComponents = singleCity[0].data.list[0].components;
  return (
    <div>
      <h2>{singleCity[0].city}</h2>
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
