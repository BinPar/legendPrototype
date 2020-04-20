import React from 'react';
import { useRouter } from 'next/router';
import Filter from './Filter';
import useWindowSize from '../hooks/useWindowSize';
import { ChartProps } from '../model/chart';
import generateRandomLegends from '../utils/generateRandomLegends';
import InterestPoint from './InterestPoint';

/**
 * Generate the chart calculating the legend positions with random
 * points and legends using a deterministic Seed
 * @param cartProps Properties of the chart
 */
const Chart = ({ seed }: ChartProps): JSX.Element => {
  const size = useWindowSize();
  const router = useRouter();

  if (!size.width) {
    return null;
  }

  const interestPoints = generateRandomLegends(seed, size);

  /**
   * Generates a new random URL when we click anywhere in the SVG
   * using a random 7 digits number (or smaller) a the seed
   */
  const update = (): void => {
    router.push(
      '/sample/[seed]',
      `/sample/${Math.floor(Math.random() * 10000000)}`,
      { shallow: true },
    );
  };

  return (
    <div className="view">
      <svg width={size.width} height={size.height} onClick={update}>
        <defs>
          <Filter />
        </defs>
        {interestPoints.map(InterestPoint)}
      </svg>
    </div>
  );
};

export default Chart;