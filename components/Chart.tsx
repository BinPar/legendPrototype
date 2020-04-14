import React from 'react';
import rnd from 'random-seed';
import { useRouter } from 'next/router';
import { loremIpsum } from 'lorem-ipsum';
import useWindowSize from '../hooks/useWindowSize';

/**
 * Maximum number of points of interest to generate in the random view
 */
const maxPoints = 30;
/**
 * Minimum number of points of interest to generate in the random view
 */
const minPoints = 10;


/**
 * Information about label
 */
export interface LabelInfo {
  /** Unique ID of the label */
  key: string;
  /** Text to display on the label */
  name: string;
  /** X coordinate of the interest point */
  cx: number;
  /** Y coordinate of the interest point */
  cy: number;
  /** X coordinate of the label start */
  tx: number;
  /** Y coordinate of the label start */
  ty: number;
}

/**
 * Settings of the current chart
 */
interface ChartProps {
  /** 
   * Seed of the chart: the same seed will generate exactly the same random result 
   * similar to how it works in MineCraft in order to allow to share the URL of any
   * unusual combination
  */
  seed?: string;
}

/**
 * Generate the chart calculating the legend positions with random
 * points and legends using a deterministic Seed
 * @param cartProps Properties of the chart
 */
const Chart = ({ seed }: ChartProps): JSX.Element => {
  const size = useWindowSize();
  const router = useRouter();

  const random = rnd.create(seed);
  
  if (!size.width) {
    return null;
  }

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

  /**
   * Total Number of point to generate
   */
  const totalPoints = random.intBetween(minPoints, maxPoints);

  /**
   * Generates random information for every point
   */
  const interestPoints = new Array<LabelInfo>(totalPoints)
    .fill({ key: '', name: '', cx: 0, cy: 0, tx: 0, ty: 0})
    .map(() => ({
      key: Math.random().toString(),
      name: loremIpsum({
        random: random.random,
        sentenceLowerBound: 1,
        sentenceUpperBound: 4,
      }).split('.')[0],
      cx: random.intBetween(size.width * 0.2, size.width * 0.8),
      cy: random.intBetween(size.height * 0.2, size.height * 0.8),
      tx: size.width / 2,
      ty: size.height / 2
    }));

  
  
  return (
    <div className="view">
      <svg width={size.width} height={size.height} onClick={update}>
        <defs>
          <filter id="sofGlow" height="500%" width="500%" x="-200%" y="-200%">
            <feMorphology
              operator="dilate"
              radius="1"
              in="SourceAlpha"
              result="thicken"
            />
            <feGaussianBlur in="thicken" stdDeviation="2" result="blurred" />
            <feFlood floodColor="rgb(255,255,255)" result="glowColor" />
            <feComposite
              in="glowColor"
              in2="blurred"
              operator="in"
              result="softGlow_colored"
            />
            <feMerge>
              <feMergeNode in="softGlow_colored" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {interestPoints.map(point => (
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
