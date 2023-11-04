/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getCitiesData } from '../redux/cities/citiesSlice';
import SingleCity from './SingleCity';
import Heading from './Heading';
import '../styles/CitiesList.css';

function CitiesList() {
  const dispatch = useDispatch();
  const cityObject = useSelector((state) => state.cities);
  useEffect(() => {
    if (cityObject.citiesData.length === 0) {
      dispatch(getCitiesData());
    }
  }, [dispatch, cityObject.citiesData]);

  const [filterText, setFilterText] = useState('');

  const filteredCities = cityObject.citiesData.filter((cityData) => cityData.city.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <div className="display-flex home-layout">
      {cityObject.citiesData.length === 0 ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="imput-countainer">
            <input
              type="text"
              placeholder="Search..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="search-box"
            />
          </div>
          <Heading />
          <ul className="city-list display-flex">
            {filteredCities.map((cityData) => (
              <SingleCity key={cityData.id} cityProp={cityData} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default CitiesList;
