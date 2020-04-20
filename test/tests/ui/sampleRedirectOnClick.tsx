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

  /**
   * Stores the last route used by the router
   * updated when a push is received
   */
  let lastPath = '';
  
  /**
   * Seed of the page to test
   */
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
    push: (_, path): void => {
      lastPath = path;
    },
  });

  // Renders the page
  const seedPage = mount(<SeedPage />);

  // Get the first chart component
  const chart = seedPage.find(Chart).first();

  // Check that it have the right seed provided 
  // by the mocked router
  expect(chart.props().seed).toBe(seed.toString());
  
  // Detect that there is no redirect
  expect(lastPath).toBe('');

  // It needs to have only one SVG in the Virtual DOM
  expect(chart.find('svg')).toHaveLength(1);

  // We get the first and only SVG
  const svg = chart.find('svg').first();

  // We Click on It
  svg.simulate('click');
  
  // Now it must make the router navigate to a different URL
  expect(lastPath.indexOf('/sample/')).toBe(0);
  
  // We check the new Seed
  const newSeed = lastPath.split('/sample/')[1];

  // It needs to be a new one
  expect(newSeed).not.toBe(seed);  
});
