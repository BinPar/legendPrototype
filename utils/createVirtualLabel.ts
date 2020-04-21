import isClient from './isClient';

/**
 * Generate a DOM label to be able 
 * to do fast calculations of the with of
 * the label width distinct texts
 * @returns {HTMLDivElement} virtual label
*/
const createVirtualLabel = (): HTMLDivElement => {
  let virtualLabel: HTMLDivElement;
  if (isClient()) {
    virtualLabel = document.createElement('div');
    virtualLabel.className = 'label';  
  }
  return virtualLabel;
}

export default createVirtualLabel;