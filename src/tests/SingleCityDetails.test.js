import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import SingleCityDetails from '../componets/SingleCityDetails';

const mockStore = configureMockStore();

describe('SingleCityDetails', () => {
  const initialState = {
    cities: {
      citiesData: [
        {
          id: '1',
          city: 'City 1',
          data: {
            list: [
              {
                components: {
                  Component1: 10,
                  Component2: 20,
                },
              },
            ],
          },
        },
      ],
    },
  };

  it('renders the component with correct city name and components', () => {
    const store = mockStore(initialState);

    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SingleCityDetails />
        </BrowserRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
