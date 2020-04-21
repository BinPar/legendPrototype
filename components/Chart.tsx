import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Filter from './Filter';
import useWindowSize from '../hooks/useWindowSize';
import { ChartProps, LabelInfo } from '../model/chart';
import generateRandomLegends from '../utils/generateRandomLegends';
import InterestPoint from './InterestPoint';
import {
  marcCrossingLines,
  haveCrossingLines,
} from '../utils/detectCrossingLines';
import removeCrossingLines from '../utils/removeCrossingLines';

/**
 * Generate the chart calculating the legend positions with random
 * points and legends using a deterministic Seed
 * @param cartProps Properties of the chart
 */
const Chart = ({ seed }: ChartProps): JSX.Element => {
  const size = useWindowSize();
  const router = useRouter();
  const [interestPoints, setInterestPoints] = useState<LabelInfo[]>(
    new Array<LabelInfo>(),
  );

  if (!size.width) {
    return null;
  }

  useEffect((): void => {
    let result = generateRandomLegends(seed, size);
    if (haveCrossingLines(result)) {
      result = removeCrossingLines(result);
      result = marcCrossingLines(result);
    }
    setInterestPoints(result);
  }, [seed, size]);

  /**
   * Generates a new random URL when we click anywhere in the SVG
   * using a random 7 digits number (or smaller) a the seed
   */
  const update = (): void => {
    let newSeed = seed;

    // There is almost no option, but we asure that
    // we do not repeat the last seed
    do {
      newSeed = `${Math.floor(Math.random() * 10000000)}`;
    } while (newSeed === seed);

    router.push('/sample/[seed]', `/sample/${newSeed}`, { shallow: true });
  };

  if (interestPoints.length === 0) {
    return <div className="view" />;
  }

  return (
    <div className="view">
      <svg width={size.width} height={size.height} onClick={update}>
        <defs>
          <Filter />
        </defs>
        {interestPoints.map(InterestPoint)}
      </svg>
      {interestPoints.map((label) => (
        <div
          key={label.key}
          className={`label ${label.labelPosition}`}
          style={{
            top: label.ty,
            width: label.labelWidth - 15,
            left: label.labelPosition === 'left' ? 0 : label.tx,
          }}
        >
          {label.name}
        </div>
      ))}
    </div>
  );
};

export default Chart;
