import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getCitiesData } from '../redux/cities/citiesSlice';
import SingleCity from './SingleCity';

function CitiesList() {
  // const cityObject = useSelector((state) => state.cities);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCitiesData());
  }, [dispatch]);
  const cityObject = useSelector((state) => state.cities);

  if (cityObject && cityObject.citiesData && cityObject.citiesData.length > 0) {
    return (
      <ul>
        {cityObject.citiesData.map((cityData) => (
          <SingleCity key={cityData.id} cityProp={cityData} />
        ))}
      </ul>
    );
  }
  return <div>Loading...</div>;
}

export default CitiesList;
