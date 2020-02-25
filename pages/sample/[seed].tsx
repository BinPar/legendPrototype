import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Chart from '../../components/Chart';

export default (): JSX.Element => {
  const router = useRouter();
  if (!router.query.seed) {
    return null;
  }
  return (
    <React.Fragment>
      <Head>
        <title>{`Legend Prototype Seed: ${router.query.seed}`}</title>
        <link rel="stylesheet" type="text/css" href="/styles.css" />
      </Head>
      <Chart seed={router.query.seed.toString()} />
    </React.Fragment>
  );
};
