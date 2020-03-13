import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Chart from '../../components/Chart';

/**
 * Random chart page that gets the seed from the route and generates
 * a random points of interest view using the {@link Chart} component.
 */
const SeedPage = (): JSX.Element => {
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

export default SeedPage;
