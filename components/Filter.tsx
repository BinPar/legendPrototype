import React from 'react';

/**
 * White glow filter for the legend lines
 * developed in SVG code
 */
const Filter = (): JSX.Element => (
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
);

export default Filter;