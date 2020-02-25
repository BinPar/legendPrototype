import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import Link from 'next/link'

export default (): JSX.Element => {
  const router = useRouter();
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Component Did Mount');
  }, []);
  const slideNum = router.query.slideNum ? parseInt(router.query.slideNum.toString(),10) : 0; 
  
  return (
    <React.Fragment>
      <Head>
        <title>Legend Prototype</title>
        <link rel="stylesheet" type="text/css" href="/styles.css" />
      </Head>
      <h1>{router.query.lessonName}</h1>
      <h2>{router.query.slideNum}</h2>
      <input type="text" />
      <br />
      <Link href="/lesson/[lessonName]/[slideNum]" as={`/lesson/${router.query.lessonName}/${slideNum + 1}`}>
        <a href="/">Second comment</a>
      </Link>
    </React.Fragment>
  );
  };
