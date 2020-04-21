import React from 'react';
import { mount } from 'enzyme';
import mockNextUseRouter from '../../mocks/mockNextUseRouter';
import SeedPage from '../../../pages/sample/[seed]';

/**
 * Checks that the render of a Page with no crossing segments
 */
test('Home Page', () => {

  const seed = 9994;
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
  
  // Verify that the Virtual DOM is not changed
  expect(seedPage).toMatchSnapshot();

  // Unmount the component
  seedPage.unmount();

});
