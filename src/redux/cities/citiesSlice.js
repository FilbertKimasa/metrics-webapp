// import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'dea85b82ceccf415bffc6e9e3c2ca0fa';

const initialState = {
  cities: [
    'Cairo',
    'Lagos',
    'Kinshasa',
    'Johannesburg',
    'Nairobi',
    'Casablanca',
    'Addis Ababa',
    'Abidjan',
    'Alexandria',
    'Khartoum',
    'Durban',
    'Accra',
    'Dar es Salaam',
    'Algiers',
    'Cape Town',
    'Luanda',
    'Pretoria',
    'Maputo',
    'Dakar',
    'Harare',
  ],
  citiesData: [],
};

const cityAirData = async (lat, long) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${baseUrl}`,
  );
  return response.data;
};

const cityCoordinates = async (city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${baseUrl}`,
  );
  return response.data;
};

const GET_DATA = 'airquality/getindex';
const getCitiesData = createAsyncThunk(GET_DATA, async (_, thunkAPI) => {
  const { cities } = thunkAPI.getState().cities;
  const citiesDataArray = [];
  await Promise.all(
    cities.map(async (city) => {
      try {
        const coordinateData = await cityCoordinates(city);
        const { lat } = coordinateData[0];
        const { lon } = coordinateData[0];
        const cityAirPromise = cityAirData(lat, lon);
        citiesDataArray.push(cityAirPromise);
      } catch (error) {
        citiesDataArray.push(null);
      }
    }),
  );

  const results = await Promise.all(citiesDataArray);
  // console.log(results);
  return results;
});

const citiesSlice = createSlice({
  name: 'handleIndexes',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCitiesData.fulfilled, (state, action) => {
      state.cities.citiesData = action.payload;
      console.log(action.payload);
    });
  },
});

export { getCitiesData };
export default citiesSlice.reducer;
