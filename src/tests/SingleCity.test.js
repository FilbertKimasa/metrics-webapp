import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SingleCity from '../componets/SingleCity';

describe('SingleCity', () => {
  const cityData = {
    city: 'City 1',
    id: '1',
    data: {
      list: [
        {
          main: {
            aqi: 3,
          },
        },
      ],
    },
  };

  it('renders correctly', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <SingleCity cityProp={cityData} />
      </BrowserRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
