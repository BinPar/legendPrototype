import React from 'react';
import { render } from 'enzyme';
import mockNextUseRouter from '../../mocks/mockNextUseRouter';
import SeedPage from '../../../pages/sample/[seed]';
import { setForceServerSimulation } from '../../../utils/isClient';

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

  // Disable client detection
  setForceServerSimulation(true);

  // Renders the page
  const seedPage = render(<SeedPage />);

  // Enable client detection
  setForceServerSimulation(false);
    
  // Verify that the Virtual DOM is not changed
  expect(seedPage).toMatchSnapshot();

});
