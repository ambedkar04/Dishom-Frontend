import { useState, useEffect } from 'react';

const useResponsive = () => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isDesktop;
};

export default useResponsive;
