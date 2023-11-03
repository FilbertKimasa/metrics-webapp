/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getCitiesData } from '../redux/cities/citiesSlice';
import SingleCity from './SingleCity';

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
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <ul>
        {filteredCities.map((cityData) => (
          <SingleCity key={cityData.id} cityProp={cityData} />
        ))}
      </ul>
    </div>
  );
}

export default CitiesList;
