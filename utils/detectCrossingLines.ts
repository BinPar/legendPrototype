import { LabelInfo } from '../model/chart';
import isCrossing from './isCrossing';

/**
 * Iterates all the legends in the legend info to detect if
 * there are pairs of crossing lines setting their property
 * isCrossed
 * @param {LabelInfo[]} legend Information of the labels to process
 * @returns {LabelInfo[]} information updated with the isCrossed attribute set
 */
export const marcCrossingLines = (legend: LabelInfo[]): LabelInfo[] => {
  // Reset of isCrossed to false;
  const result = legend.map(label => ({...label, isCrossed: false}));
  for (let i=0;i<result.length;i++) {
    const firstLine = result[i];
    /**
     * We can skip the previous checks starting the iterator 
     * with i+1 to avoid duplicate checks
     */
    for (let j=i + 1;j<result.length;j++) {
      const secondLine = result[j];      
      if (isCrossing(firstLine,secondLine)) {
        // If they are crossing we mark both as crossed
        firstLine.isCrossed = true;
        secondLine.isCrossed = true;
      }
    }
  }
  return result;
}

/**
 * Iterates all the legends in the legend info to detect if
 * there are at least one pair of crossing lines
 * @param {LabelInfo[]} legend Information of the labels to process
 * @returns {boolean} true it there is at least one crossing line
 */
export const haveCrossingLines = (legend: LabelInfo[]): boolean => {  
  for (let i=0;i<legend.length;i++) {
    const firstLine = legend[i];
    /**
     * We can skip the previous checks starting the iterator 
     * with i+1 to avoid duplicate checks
     */
    for (let j=i;j<legend.length;j++) {
      const secondLine = legend[j];
      if (isCrossing(firstLine,secondLine)) {
        /**
         * We only need to find one pair of crossing legends to asume
         * that there are crossing lines
         */ 
        return true;
      }
    }
  }
  return false;
}

