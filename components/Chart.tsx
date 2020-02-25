import React from 'react';
import rnd from 'random-seed';
import { useRouter } from 'next/router';
import { loremIpsum } from 'lorem-ipsum';
import useWindowSize from '../hooks/useWindowSize';

const maxPoints = 30;
const minPoints = 10;

export interface Position {
  key: string;
  cx: number;
  cy: number;
}

interface ChartProps {
  seed?: string;
}

export default ({ seed }: ChartProps): JSX.Element => {
  const size = useWindowSize();
  const router = useRouter();

  const random = rnd.create(seed);
  if (!size.width) {
    return null;
  }
  const update = (): void => {
    router.push(
      '/sample/[seed]',
      `/sample/${Math.floor(Math.random() * 10000000)}`,
      { shallow: true },
    );
  };

  const totalPoints = random.intBetween(minPoints, maxPoints);

  const interestPoints = new Array<Position>(totalPoints)
    .fill({ key: '', cx: 0, cy: 0 })
    .map(() => ({
      key: Math.random().toString(),
      name: loremIpsum({
        random: random.random,
        sentenceLowerBound: 1,
        sentenceUpperBound: 4,
      }).split('.')[0],
      cx: random.intBetween(size.width * 0.2, size.width * 0.8),
      cy: random.intBetween(size.height * 0.2, size.height * 0.8),
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
              x2={size.width / 2}
              y2={size.height / 2}
              stroke="black"
              strokeWidth="3"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};
