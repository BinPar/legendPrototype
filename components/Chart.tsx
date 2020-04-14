import React from 'react';
import { useRouter } from 'next/router';
import Filter from './Filter';
import useWindowSize from '../hooks/useWindowSize';
import { ChartProps } from '../model/chart';
import generateRandomLegends from '../utils/generateRandomLegends';

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
        {interestPoints.map((point) => (
          <g key={`${point.key}`} filter="url(#sofGlow)">
            <circle {...point} r={5} fill="#000" filter="url(#sofGlow)" />
            <line
              x1={point.cx}
              y1={point.cy}
              x2={point.tx}
              y2={point.ty}
              stroke="black"
              strokeWidth="3"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default Chart;
