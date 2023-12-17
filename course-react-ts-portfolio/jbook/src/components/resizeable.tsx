import './resizeable.css';
import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizeableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

// Default horizontal width to be 75% of window inner width
const calcHorizontalWidth = () => window.innerWidth * 0.75;

const Resizable: React.FC<ResizeableProps> = ({ direction, children }) => {
  let resizeableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [horizontalWidth, setHorizontalWidth] = useState(calcHorizontalWidth());

  useEffect(() => {
    let timer: any;

    const recalculateHorizontalWidth = () => {
      setInnerHeight(window.innerHeight);
      setInnerWidth(window.innerWidth);

      // Should we set the horizontal width on window resize?
      const calcedWidth = calcHorizontalWidth();
      if (calcedWidth < horizontalWidth) {
        setHorizontalWidth(calcedWidth);
      }
    };

    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        recalculateHorizontalWidth();
      }, 100);
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  if (direction === 'horizontal') {
    resizeableProps = {
      className: 'resize-horizontal',
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      resizeHandles: ['e'],
      height: Infinity,
      width: horizontalWidth,
      onResizeStop: (event, data) => {
        // Keep horizontal width in sync w/ current width on window resizes
        setHorizontalWidth(data.size.width);
      },
    };
  } else {
    resizeableProps = {
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 24],
      resizeHandles: ['s'],
      height: 300,
      width: Infinity,
    };
  }

  return <ResizableBox {...resizeableProps}>{children}</ResizableBox>;
};

export default Resizable;
