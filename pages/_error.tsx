import React from 'react';
import Head from 'next/head';

/**
 * Interface of properties received by the 
 * error page
 */
interface ErrorProps {
  /**
   * Error code
   */
  statusCode?: number;
}

/**
 * We typically use NextPageContext imported for next
 * as the type of the input parameter for getInitialProps
 * but in this case we just need this small subset
 * that is easier for mocking requests
 */
interface SimplifiedNextPageContext {
  /**
   * Response info
   */
  res?: ErrorProps;
  /**
   * Error info
   */
  err?: ErrorProps;
}

/**
 * Custom error page
 * @param {ErrorProps} Props properties of the page
 * @returns {JSX.Element} Error page
 */
const Error = ({ statusCode }: ErrorProps): JSX.Element => {
  return (
    <React.Fragment>
      <Head>
        <title>Page not found</title>
        <link rel="stylesheet" type="text/css" href="/styles.css" />
      </Head>
      <h1>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </h1>
    </React.Fragment>
  );
};

/**
 * Gets the errors from the request properties
 * @param {SimplifiedNextPageContext} PageContext Request properties
 * @returns {ErrorProps} request error code
 */
Error.getInitialProps = ({ res, err }: SimplifiedNextPageContext): ErrorProps => {
  if (res && res.statusCode) {
    return { statusCode: res.statusCode };
  }
  if (err && err.statusCode) {
    return { statusCode: err.statusCode };
  }
  return { statusCode: 404 };
};

export default Error;
