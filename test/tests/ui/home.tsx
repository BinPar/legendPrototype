import React from 'react';
import { mount } from 'enzyme';
import mockNextUseRouter from '../../mocks/mockNextUseRouter';
import Index from '../../../pages/index';

/**
 * Checks that the Home Page redirects to some sample
 */
test('Home Page', () => {

  /**
   * Stores the last route used by the router
   * updated when a push is received
   */
  let lastPath = '';


  /**
   * Mocks the next router
   */
  mockNextUseRouter({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: (_, path): void => {
      lastPath = path;
    },
  });

  // Renders the page
  const page = mount(<Index />);

  // The home page have no text on it, just redirects to some page
  expect(page.text()).toMatch('');  

  // The router detect a pushed redirection to some sample URL
  expect(lastPath.indexOf('/sample/')).toBe(0);

});
