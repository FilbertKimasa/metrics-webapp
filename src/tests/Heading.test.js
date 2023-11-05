import React from 'react';
import renderer from 'react-test-renderer';
import Heading from '../componets/Heading';

jest.mock('react-router-dom', () => ({
  Link: 'a',
}));

describe('Heading', () => {
  it('should render correctly', () => {
    const component = renderer.create(<Heading />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
