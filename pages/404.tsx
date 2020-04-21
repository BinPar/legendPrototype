import React from 'react';
import Head from 'next/head';

/**
 * Page not found custom error page
 */
export default (): JSX.Element => {
  return (
    <React.Fragment>
      <Head>
        <title>Page not found</title>
        <link rel="stylesheet" type="text/css" href="/styles.css" />
      </Head>
      <h1>Error 404: This page could not be found</h1>
    </React.Fragment>
  );
};
