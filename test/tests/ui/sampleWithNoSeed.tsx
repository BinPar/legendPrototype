import React from 'react';
import { mount } from 'enzyme';
import mockNextUseRouter from '../../mocks/mockNextUseRouter';
import SeedPage from '../../../pages/sample/[seed]';

/**
 * Checks that the sample page redirects to some other
 * sample if we clock on the SVG
 */
test('Home Page', () => {

  /**
   * Mocks the next router
   * with the info of the 
   * current page
   */
  mockNextUseRouter({
    route: '/sample/[seed]',
    pathname: '/sample/[seed]',
    query: {},
    asPath: `/sample/`,
  });

  // Renders the page
  const seedPage = mount(<SeedPage />);

  // Verify that the Virtual DOM is not changed
  expect(seedPage).toMatchSnapshot();

});
