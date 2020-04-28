/* eslint-disable no-param-reassign */
import { LabelInfo } from '../model/chart';
import isCrossing from './isCrossing';
import { haveCrossingLines } from './detectCrossingLines';
import { maxIterations } from '../settings';

/**
 * Swap the legend vertical position of two legends
 * Note: This function do not respect the rules of functional programing because
 * it is altering the entrance params, but it is required for performance optimization
 * @param firstLegend  first legend to swap
 * @param secondLegend second legend to swap
 */
const swapLegends = (firstLegend: LabelInfo, secondLegend: LabelInfo): void => {
  // Typical swap procedure of the ty (the Y coordinate of the label)
  const firstLegendY = firstLegend.ty;
  firstLegend.ty = secondLegend.ty;
  secondLegend.ty = firstLegendY;
};

/**
 * Iterates all the legends in the legend info to detect if
 * there are pairs of crossing lines swapping them
 * @param {LabelInfo[]} legend Information of the labels to process
 * @param {boolean} allowElbowMode allow the system to use the Elbow mode
 * @returns {LabelInfo[]} information updated with the isCrossed attribute set
 */
const swapCrossingLines = (
  legend: LabelInfo[],
  allowElbowMode: boolean,
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
      if (
        firstLine.labelPosition === secondLine.labelPosition &&
        isCrossing(firstLine, secondLine, allowElbowMode)
      ) {
        // If they are crossing we need to swap them
        swapLegends(firstLine, secondLine);
        // We swap them in the result array too
        result.splice(j, 1, firstLine);
        result.splice(i, 1, secondLine);
        firstLine = secondLine;
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
const removeCrossingLines = (legends: LabelInfo[]): LabelInfo[] => {
  let result = legends.map((label) => ({ ...label, isCrossed: false }));

  let i = 0;

  /**
   * Note: This function do not respect the rules of functional programing because
   * it is altering the entrance params, but it is required for performance optimization
   */
  const resetUseElbowMode = (resultToReset: LabelInfo[]): void =>
    resultToReset.forEach((label): void => {
      label.useElbowMode = false;
    });

  resetUseElbowMode(result);

  while (i++ < maxIterations && haveCrossingLines(result)) {
    if (i < 20) {
      result = swapCrossingLines(result, i > 100);
    } else {
      // resetUseElbowMode(result);
      result = swapCrossingLines(result, i > 100);
    }
  }

  return result;
};

export default removeCrossingLines;
