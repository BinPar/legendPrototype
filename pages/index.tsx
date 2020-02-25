import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default (): JSX.Element => {
  const router = useRouter();
  useEffect(() => {
    router.push('/sample/[seed]', `/sample/${Math.floor(Math.random() * 10000000)}`, { shallow: true })
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>Legend Prototype</title>
        <link rel="stylesheet" type="text/css" href="/styles.css" />
      </Head>
    </React.Fragment>
  );
};
