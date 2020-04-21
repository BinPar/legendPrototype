import { LabelInfo } from '../model/chart';

/**
 * Detects if the segments (ax1,ay1)-(ax2,ay2) and (bx1,by1)-(bx2,by2)
 * are crossing each other
 * @param {number} ax1 X coordinate of the first point of the first segment
 * @param {number} ay1 Y coordinate of the first point of the first segment
 * @param {number} ax2 X coordinate of the second point of the first segment
 * @param {number} ay2 Y coordinate of the second point of the first segment
 * @param {number} bx1 X coordinate of the first point of the second segment
 * @param {number} by1 Y coordinate of the first point of the second segment
 * @param {number} bx2 X coordinate of the second point of the second segment
 * @param {number} by2 Y coordinate of the second point of the second segment
 * @returns true if both are intersected
 */
export const intersects = (
  ax1: number,
  ay1: number,
  ax2: number,
  ay2: number,
  bx1: number,
  by1: number,
  bx2: number,
  by2: number,
): boolean => {
  /**
   * [TLTR]: Math required for this, sorry for non science coders!
   *
   * Explanation:
   *
   * Segments can be described by some initial vector, v, and a direction vector, d:
   * r = v + lambda * d
   *
   * We use one point (ax1,ay1) as the initial vector and the difference between
   * them (ax2-ax1,ay2-ay1) as the direction vector. Likewise for our second line.
   *
   * If our two lines intersect, then there must be a point, X, that is reachable
   * by travelling some distance, lambda, along our first line and also reachable
   * by travelling gamma units along our second line.
   *
   * This gives us two simultaneous equations for the coordinates of X:
   *
   * X = v1 + lambda * d1
   * X = v2 + gamma * d2
   *
   * These equations can be represented in matrix form. We check that the determinant
   * is non-zero to see if the intersection X even exists.
   *
   * If there is an intersection, then we must check that the intersection actually lies
   * between both sets of points. If lambda is greater than 1, the intersection is beyond
   * the second point. If lambda is less than 0, the intersection is before the first point.
   *
   * Hence, 0<lambda<1 && 0<gamma<1 indicates that the two lines intersect!
   */

  const pendentDelta = (ax2 - ax1) * (by2 - by1) - (bx2 - bx1) * (ay2 - ay1);

  if (pendentDelta === 0) {
    // Parallel segments, they can not cross
    return false;
  }

  const lambda =
    ((by2 - by1) * (bx2 - ax1) + (bx1 - bx2) * (by2 - ay1)) / pendentDelta;
  const gamma =
    ((ay1 - ay2) * (bx2 - ax1) + (ax2 - ax1) * (by2 - ay1)) / pendentDelta;

  return lambda > 0 && lambda < 1 && gamma > 0 && gamma < 1;
};

/**
 * Check if two lines are crossed
 * @param {LabelInfo} lineA first line to check
 * @param {LabelInfo} lineB second line to check
 * @returns {boolean} true if the lines do cross each other
 */
const isCrossing = (lineA: LabelInfo, lineB: LabelInfo): boolean => {
  return intersects(
    lineA.cx,
    lineA.cy,
    lineA.tx,
    lineA.ty,
    lineB.cx,
    lineB.cy,
    lineB.tx,
    lineB.ty,
  );
};

export default isCrossing;
