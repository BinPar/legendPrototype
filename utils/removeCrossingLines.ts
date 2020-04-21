import { LabelInfo } from '../model/chart';
import isCrossing from './isCrossing';
import { haveCrossingLines } from './detectCrossingLines';
import { maxIterations } from '../settings';

/**
 * Swap the legend vertical position of two legends
 * @param firstLegend  first legend to swap
 * @param secondLegend second legend to swap
 * @param iteration number of iteration
 */
const swapLegends = (
  firstLegend: LabelInfo,
  secondLegend: LabelInfo,
  iteration: number,
): void => {
  const legends = {
    a: firstLegend,
    b: secondLegend,
  };
  // Typical swap procedure of the ty (the Y coordinate of the label)
  const firstLegendY = firstLegend.ty;
  legends.a.ty = legends.b.ty;
  legends.b.ty = firstLegendY;

  if (iteration > 10) {
    /**
     * OK, this is complex, some times after iterating 10 times there is no solution
     * it is caused because event swapping the vertical coordinate of the label
     * both are crossing.
     * The only option of this to happen is that the text in one label in much longer
     * than the other.
     * This fix increases the minor label size by 10 every time we swap it after the
     * 10th iteration to solve this mutual crossing escenarios.
     * Reducing the 10 pixels ratio will reduce the number of iterations but will generate
     * more space than the required for this operation.
     */
    if (legends.a.labelWidth > legends.b.labelWidth) {
      legends.b.labelWidth += 10;
      legends.b.tx += legends.b.labelPosition === 'left' ? 10 : -10;
    }
    if (legends.a.labelWidth < legends.b.labelWidth) {
      legends.a.labelWidth += 10;
      legends.a.tx += legends.a.labelPosition === 'left' ? 10 : -10;
    }
  }
};

/**
 * Iterates all the legends in the legend info to detect if
 * there are pairs of crossing lines swapping them
 * @param {LabelInfo[]} legend Information of the labels to process
 * @param {number} iteration The number of iteration
 * @returns {LabelInfo[]} information updated with the isCrossed attribute set
 */
const swapCrossingLines = (
  legend: LabelInfo[],
  iteration: number,
): LabelInfo[] => {
  const result = [...legend];
  // Reset of isCrossed to false;
  for (let i = 0; i < result.length; i++) {
    let firstLine = result[i];
    /**
     * We can skip the previous checks starting the iterator
     * with i+1 to avoid duplicate checks
     */
    for (let j = i + 1; j < result.length; j++) {
      const secondLine = result[j];
      if (firstLine.labelPosition === secondLine.labelPosition) {
        if (isCrossing(firstLine, secondLine)) {
          // If they are crossing we need to swap them
          swapLegends(firstLine, secondLine, iteration);
          // We swap them in the result array too
          result.splice(j, 1, firstLine);
          result.splice(i, 1, secondLine);
          firstLine = secondLine;
        }
      }
    }
  }
  return result;
};

/**
 * Wile the model have crossing legend lines it swaps the crossing lines
 * It avoids infinite loops limiting the number of iterations to maxIterations
 * @param {LabelInfo[]} legend Information of the labels to process
 * @returns {LabelInfo[]} information updated avoiding crossing lines
 */
const removeCrossingLines = (legend: LabelInfo[]): LabelInfo[] => {
  let result = legend.map((label) => ({ ...label, isCrossed: false }));

  let i = 0;

  while (i++ < maxIterations && haveCrossingLines(result)) {
    result = swapCrossingLines(result, i);
  }
  
  return result;
};

export default removeCrossingLines;
