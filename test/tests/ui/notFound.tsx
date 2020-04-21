import React from 'react';
import { mount } from 'enzyme';
import NotFound from '../../../pages/404';

/**
 * Checks that the 404 Not Found page renders correctly 
 */
test('Home Page', () => {

  // Renders the page
  const page = mount(<NotFound />);

  // We check that the content of the page is not changed
  expect(page).toMatchSnapshot();

});
