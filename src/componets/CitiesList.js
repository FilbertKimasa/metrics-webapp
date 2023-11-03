import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getCitiesData } from '../redux/cities/citiesSlice';

function CitiesList() {
  const cityObject = useSelector((state) => state.cities);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCitiesData());
  }, [dispatch]);

  console.log(cityObject.citiesData);
  return (
    <ul>
      {cityObject.citiesData.map((city) => (
        <RocketItem key={city.id} itemProp={city} />
      ))}
    </ul>
  );
}

export default CitiesList;
