import { v4 as uuidv4 } from 'uuid';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const airApiKey = 'dea85b82ceccf415bffc6e9e3c2ca0fa';
const coordinateApiKey = 'rB16lee6ZvybB0ZCrsrzwQ==6odUeEwciclckq71';

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
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${airApiKey}`,
  ).then((resp) => resp.json());
  return response;
};

const cityCoordinates = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${coordinateApiKey}`,
  ).then((resp) => resp.json());
  return response;
};

const GET_DATA = 'airquality/getindex';
const getCitiesData = createAsyncThunk(GET_DATA, async (_, thunkAPI) => {
  const citiesDataArray = [];
  const { cities } = thunkAPI.getState();
  cities.forEach((city) => {
    citiesDataArray.push(
      cityCoordinates(city).then(async (cityCoord) => {
        const { lat } = cityCoord[0];
        const long = cityCoord[0].lon;
        const cityData = await cityAirData(lat, long);
        return { id: uuidv4(), city, data: cityData.list[0] };
      }),
    );
  });
  const citiesData = await Promise.all(citiesDataArray).then(
    (result) => result,
  );
  return citiesData;
});

const citiesSlice = createSlice({
  name: 'handleIndexes',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCitiesData.fulfilled, (state, action) => {
      state.cities.citiesData = action.payload;
    });
  },
});

export { getCitiesData };
export default citiesSlice.reducer;
