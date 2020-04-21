import { useState, useEffect } from 'react';
import isClient from '../utils/isClient';

/**
 * Size with width and height in pixels
 */
export interface Size {
  /**
   * with of the size in pixels
   */
  width: number;
  /**
   * height of the size in pixels
   */
  height: number;
}

/**
 * React Hook that returns the current inner windows size 
 * and updates it every time the window resizes
 * @returns {Size} Size of the current window
 * Note: In case of SSR, it will return 0 as width and height
 */
const useWindowSize = (): Size => {
  const client = isClient();

  /**
   * Calculates the size of the window
   * @returns {Size} Size of rhe current window 
   * or 0 as width and height on SSR
   */
  const getSize = (): Size => ({
    width: client ? window.innerWidth : 0,
    height: client ? window.innerHeight : 0,
  });

  /**
   * State to store the actual size
   */
  const [windowSize, setWindowSize] = useState<Size>(getSize());

  /**
   * Recalculates the size when the component is mounted and
   * updates it when the window resizes.
   * It never recalculates when any other property changes
   * @returns Function to clear effect to remove the resize event listener
   */
  useEffect(() => {
    const handleResize = (): void => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
