import { useState, useEffect } from 'react';

export interface Size {
  width: number;
  height: number;
}

const useWindowSize = (): Size => {
  const isClient = typeof window === 'object';

  const getSize = (): Size => ({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  });

  const [windowSize, setWindowSize] = useState<Size>({width:0, height: 0});

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
