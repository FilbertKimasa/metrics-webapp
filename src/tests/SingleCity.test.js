/* eslint-disable import/order */
import { getCitiesData, cityAirData } from '../redux/cities/citiesSlice';
import axios from 'axios';

jest.mock('axios');

describe('getCitiesData', () => {
  it('should fetch city coordinates and air quality data for each city', async () => {
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn(() => ({ cities: { cities: ['Cairo'] } }));
    const mockCityCoordinates = jest
      .fn()
      .mockResolvedValue([{ lat: 30, lon: 31 }]);
    const mockCityAirData = jest.fn().mockResolvedValue({ airQuality: 'Good' });
    axios.get = jest
      .fn()
      .mockResolvedValueOnce({ data: [{ lat: 30, lon: 31 }] })
      .mockResolvedValueOnce({ data: { airQuality: 'Good' } });

    await getCitiesData(undefined, {
      dispatch: mockDispatch,
      getState: mockGetState,
    });

    expect(mockCityCoordinates).toHaveBeenCalledWith('Cairo');
    expect(mockCityAirData).toHaveBeenCalledWith(30, 31);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'airquality/getindex/fulfilled',
      payload: [
        {
          id: expect.any(String),
          city: 'Cairo',
          data: { airQuality: 'Good' },
        },
      ],
    });
  });

  it('should handle errors when fetching city coordinates', async () => {
    const mockDispatch = jest.fn();
    const mockGetState = jest.fn(() => ({ cities: { cities: ['Cairo'] } }));
    const mockCityCoordinates = jest.fn().mockRejectedValue('failed to fetch');
    axios.get = jest.fn().mockRejectedValue('failed to fetch');

    await getCitiesData(undefined, {
      dispatch: mockDispatch,
      getState: mockGetState,
    });

    expect(mockCityCoordinates).toHaveBeenCalledWith('Cairo');
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'airquality/getindex/fulfilled',
      payload: [null],
    });
  });
});

describe('cityAirData', () => {
  it('should fetch air quality data for a given latitude and longitude', async () => {
    const lat = 30;
    const lon = 31;
    const mockResponse = { airQuality: 'Good' };
    axios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await cityAirData(lat, lon);

    expect(result).toEqual(mockResponse);
    expect(axios.get).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=862090a665075dd09b646a7cca4e4e1e`,
    );
  });
});
