import createVirtualLabel from './createVirtualLabel';
import { averageCharWidth } from '../settings';
import isJest from './isJest';

let virtualLabel: HTMLDivElement = createVirtualLabel();

/**
 * Calculates the size of pixels os a label for a given label text
 * @param {string} labelText Text contained in the label
 * @returns {number} The number of pixels of the width of the text
 */
const getLabelSize = (labelText: string): number => {
  if (!virtualLabel || isJest()) {
    // If we are in SSR or in Jest (because enzyme do not simulate real DOM)
    // we need to do an aproximate calculation
    return labelText.length * averageCharWidth;
  }
  virtualLabel.innerText = labelText;
  return virtualLabel.clientWidth;
};

/**
 * Allows you to update the virtual label
 * @param {HTMLDivElement} newVirtualLabel virtual label to set
 */
export const setVirtualLabel = (newVirtualLabel: HTMLDivElement): void => {
  virtualLabel = newVirtualLabel;
};

/**
 * Allows you to get the current virtual label
 * @returns {HTMLDivElement} current virtual label
 */
export const getVirtualLabel = (): HTMLDivElement => {
  return virtualLabel;
};

export default getLabelSize;
