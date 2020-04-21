import {intersects} from '../../../utils/isCrossing';

/**
 * Generic test to check segment pair intersections
 */
export default test('Check segment intersections', (): void => {
  // Simple cross 
  expect(intersects(1, 1,-1,-1,-1,1,1 ,-1)).toBeTruthy();
  // Reverse cross
  expect(intersects(-1,1,1 ,-1, 1, 1,-1,-1)).toBeTruthy();
  // Vertical Parallel lines
  expect(intersects(1,1,1,-1,-1,1,-1,-1)).toBeFalsy();
  // Horizontal Parallel lines
  expect(intersects(1,1,-1,1,-1,-1,1,-1)).toBeFalsy();
});
