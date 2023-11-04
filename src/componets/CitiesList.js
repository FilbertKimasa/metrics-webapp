/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getCitiesData } from '../redux/cities/citiesSlice';
import SingleCity from './SingleCity';
import Heading from './Heading';
import '../styles/CitiesList.css';

function CitiesList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCitiesData());
  }, [dispatch]);
  const cityObject = useSelector((state) => state.cities);

  const [filterText, setFilterText] = useState('');

  const filteredCities = cityObject.citiesData.filter((cityData) =>
    cityData.city.toLowerCase().includes(filterText.toLowerCase()),
  );
  return (
    <div className=" display-flex home-layout">
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="search-box"
      />
      <Heading />
      <ul className="city-list display-flex">
        {filteredCities.map((cityData) => (
          <SingleCity key={cityData.id} cityProp={cityData} />
        ))}
      </ul>
    </div>
  );
}

export default CitiesList;
