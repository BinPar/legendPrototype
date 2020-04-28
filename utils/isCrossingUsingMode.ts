import { LabelInfo } from '../model/chart';
import intersects from './intersects';

/**
 * Obtains how much we need to move in the X axis the vector that joins both segments
 * in the legend depending on the mode of the LabelInfo
 * @param {LabelInfo} line information of the interest point
 * @returns {number} correction in pixels for the X coordinate
 */
const getLabelXCorrection = (line: LabelInfo): number => {
  if (line.labelPosition === 'left') {
    return line.useElbowMode ? line.cx - line.tx : 0;
  }
  return line.useElbowMode ? line.cx - line.tx : 0;
};

/**
 * Point position in a coordinates system
 */
interface Point {
  // X coordinate of the point
  x: number;
  // Y coordinate of the point
  y: number;
}

/**
 * The 3 vertexes that uses the legend for it wire-frame
 * composed by two segments Vertex[0] to Vertex[1]
 * and Vertex[1] to Vertex[2]
 * @param {LabelInfo} line information of the interest point
 * @returns Array with 3 points representing the vertexes of the label
 */
const getVertexFromLabelInfo = (line: LabelInfo): [Point, Point, Point] => {
  const correction = getLabelXCorrection(line);

  const result: [Point, Point, Point] = [
    // Vertex that it located in the screen border (0 or 100%) and the Y
    // position of the label text
    {
      x: line.labelPosition === 'left' ? 0 : line.tx + line.labelWidth,
      y: line.ty,
    },
    // Vertex that it located at the other side of the label or
    // in the vertical of the target point in the case of ElbowMode
    {
      x: line.tx + correction,
      y: line.ty,
    },
    {
      x: line.cx,
      y: line.cy,
    },
  ];

  return result;
};

/**
 * Check if two lines are crossed using the isCrossingUsingMode
 * Label infos with useElbowMode true:
 * The first line comes from the outside of the screen horizontally to the vertical position
 * of the interest point and the second line goes vertically to the point creating
 * a "L" shape
 * Label infos with useElbowMode false:
 * The first line comes from the outside of the screen horizontally to the end of the legend
 * and then the second line goes directly to the interest point
 * @param {LabelInfo} lineA first line to check
 * @param {LabelInfo} lineB second line to check
 * @returns {boolean} true if the lines do cross each other
 */
const isCrossingUsingMode = (lineA: LabelInfo, lineB: LabelInfo): boolean => {
  const lineAVertexes = getVertexFromLabelInfo(lineA);
  const lineBVertexes = getVertexFromLabelInfo(lineB);
  
  // Point to label to point to label check
  if (
    intersects(
      lineAVertexes[1].x,
      lineAVertexes[1].y,
      lineAVertexes[2].x,
      lineAVertexes[2].y,
      lineBVertexes[1].x,
      lineBVertexes[1].y,
      lineBVertexes[2].x,
      lineBVertexes[2].y,
    )
  ) {
    return true;
  }

  // Point to label to label check
  if (
    intersects(
      lineAVertexes[0].x,
      lineAVertexes[0].y,
      lineAVertexes[1].x,
      lineAVertexes[1].y,
      lineBVertexes[1].x,
      lineBVertexes[1].y,
      lineBVertexes[2].x,
      lineBVertexes[2].y,
    )
  ) {
    return true;
  }

  // Label to point to label check
  if (
    intersects(
      lineAVertexes[1].x,
      lineAVertexes[1].y,
      lineAVertexes[2].x,
      lineAVertexes[2].y,
      lineBVertexes[0].x,
      lineBVertexes[0].y,
      lineBVertexes[1].x,
      lineBVertexes[1].y,
    )
  ) {
    return true;
  }
  return false;
};

export default isCrossingUsingMode;
