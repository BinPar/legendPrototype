import isClient from './isClient';

let virtualLabel: HTMLDivElement;

/**
 * Generate a DOM label to be able
 * to do fast calculations of the with of
 * the label width distinct texts
 * @returns {HTMLDivElement} virtual label
 */
const createVirtualLabel = (): HTMLDivElement => {
  if (isClient()) {
    if (virtualLabel !== undefined) {
      // We do reuse the last virtual 
      // label if it exists
      return virtualLabel;
    } 
    virtualLabel = document.createElement('div');
    document.body.append(virtualLabel);
    virtualLabel.className = 'label';
    virtualLabel.id = 'virtualLabel';
    return virtualLabel;
  }
  return undefined;
};

export default createVirtualLabel;
