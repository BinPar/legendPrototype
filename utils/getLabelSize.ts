import isClient from './isClient';
import {averageCharWidth} from '../settings';

let virtualLabel: HTMLDivElement;

/**
 * We do generate a DOM label to be able 
 * to do fast calculations of the with of
 * the label width distinct texts
 */
if (isClient()) {
  virtualLabel = document.createElement('div');
  virtualLabel.className = 'label';  
}

const getLabelSize = (labelText: string): number => {
  if (!virtualLabel) {
    return labelText.length * averageCharWidth;
  }
  virtualLabel.innerText = labelText;
  let result = virtualLabel.clientWidth;
  if (typeof jest !== 'undefined') {
    result = labelText.length * averageCharWidth;
  }
  return result;
}

/**
 * Allows you to update the virtual label
 * @param {HTMLDivElement} newVirtualLabel virtual label to set
 */
export const setVirtualLabel = (newVirtualLabel: HTMLDivElement): void => {
  virtualLabel = newVirtualLabel;
}


/**
 * Allows you to get the current virtual label
 * @returns {HTMLDivElement} current virtual label
 */
export const getVirtualLabel = (): HTMLDivElement => {
  return virtualLabel;
}

export default getLabelSize;