import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getCitiesData } from '../redux/cities/citiesSlice';

function CitiesList() {
  const cityData = useSelector((state) => state.cities);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCitiesData());
  }, [dispatch]);

  console.log(cityData);
  return <div>hi</div>;
}

export default CitiesList;
