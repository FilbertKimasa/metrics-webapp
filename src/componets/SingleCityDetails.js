/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link, useParams } from 'react-router-dom';

function SingleCityDetails() {
  const cityObject = useSelector((state) => state.cities);
  const { id } = useParams();
  return <div>{console.log(id)}</div>;
}

export default SingleCityDetails;
