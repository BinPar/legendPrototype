import React from 'react';
import { mount } from 'enzyme';
import Error from '../../../pages/_error';

/**
 * Checks that the error page renders correctly
 */
test('Home Page', () => {
  // We test the res based version of the error page
  const responseError = Error.getInitialProps({ res: { statusCode: 500 } });

  // Renders the page
  const errorPageWithResponse = mount(<Error {...responseError} />);

  // We check that the content of the page is not changed naming the snapshot
  // because we have many models for the error page
  expect(errorPageWithResponse).toMatchSnapshot('errorPageWithResponse');

  // We test the err based version of the error page
  const errError = Error.getInitialProps({ err: { statusCode: 501 } });

  // Renders the page
  const errorPageWithErr = mount(<Error {...errError} />);

  // We check that the content of the page is not changed naming the snapshot
  // because we have many models for the error page
  expect(errorPageWithErr).toMatchSnapshot('errorPageWithErr');

  // We test the err based version of the error page
  const emptyError = Error.getInitialProps({});

  // Renders the page
  const errorPageWithNoInfo = mount(<Error {...emptyError} />);

  // We check that the content of the page is not changed naming the snapshot
  // because we have many models for the error page
  expect(errorPageWithNoInfo).toMatchSnapshot('errorPageWithNoInfo');

  // Renders the page
  const clientSideError = mount(<Error />);

  // We check that the content of the page is not changed naming the snapshot
  // because we have many models for the error page
  expect(clientSideError).toMatchSnapshot('clientSideError');
});
