import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CitiesList from './componets/CitiesList';
import SingleCityDetails from './componets/SingleCityDetails';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CitiesList />} />
        <Route path="/details/:id" element={<SingleCityDetails />} />
      </Routes>
    </div>
  );
}

export default App;
