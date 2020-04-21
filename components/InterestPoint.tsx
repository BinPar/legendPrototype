import React from 'react';
import { LabelInfo } from '../model/chart';

/**
 * Returns the SVG line of the point of interest and other SVG visual details
 * @param {LabelInfo} point Information about the point to draw in the SVG
 * @returns SVG group with the visual elements to draw the interest point
 */
const InterestPoint = (point: LabelInfo): JSX.Element => (
  <g key={`${point.key}`} filter="url(#sofGlow)">
    <line
      x1={point.cx}
      y1={point.cy}
      x2={point.tx}
      y2={point.ty}
      stroke={point.isCrossed ? 'red' : 'black'}
      strokeWidth="3"
    />
    <circle
      cx={point.cx}
      cy={point.cy}
      r={5}
      fill="#000"
      filter="url(#sofGlow)"
    />
  </g>
);

export default InterestPoint;
