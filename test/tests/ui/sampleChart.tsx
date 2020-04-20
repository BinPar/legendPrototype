import React from 'react';
import { mount } from 'enzyme';
import mockNextUseRouter from '../../mocks/mockNextUseRouter';
import SeedPage from '../../../pages/sample/[seed]';
import Chart from '../../../components/Chart';

/**
 * Checks that the sample page redirects to some other
 * sample if we clock on the SVG
 */
test('Home Page', () => {

  const seed = 480829;
  /**
   * Mocks the next router
   * with the info of the 
   * current page
   */
  mockNextUseRouter({
    route: '/sample/[seed]',
    pathname: '/sample/[seed]',
    query: {
      seed,
    },
    asPath: `/sample/${seed}`,
  });

  // Renders the page
  const seedPage = mount(<SeedPage />);

  // Get the first chart component
  const chart = seedPage.find(Chart).first();

  // Check that it have the right seed provided 
  // by the mocked router
  expect(chart.props().seed).toBe(seed.toString());
  
  // Verify that the Virtual DOM is not changed
  expect(chart).toMatchSnapshot();

  // Unmount the component
  seedPage.unmount();

});
