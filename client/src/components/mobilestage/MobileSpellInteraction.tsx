import React, { useState, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

export default function MobileSpellInteraction() {
  const startX = 0;
  const startY = 300;
  const targetRef = useRef(null);
  const [{ x2, y2 }, api] = useSpring(() => ({ x2: startX, y2: startY }));
  const [dragging, setDragging] = useState(false);
  const [attached, setAttached] = useState(false);

  const bind = useDrag(({ xy: [x, y], active, last, movement: [mx, my] }) => {
    setDragging(active);
    setAttached(document.elementFromPoint(x, y) === targetRef.current);
    if (last) {
      api.start({ x2: 0, y2: attached ? 0 : startY });
    } else {
      api.start({ x2: startX + mx, y2: startY + my, immediate: true });
    }
  });

  return (
    <div className="flex items-center justify-center m-4 h-screen sm:w-96 m-auto relative">
      <img src="/assets/wand.png" alt="wand" className="w-96" />
      <svg
        className="absolute"
        height="1000"
        width="1000"
        viewBox="-500 -500 1000 1000"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <animated.line x1={startX} y1={startY} x2={x2} y2={y2} stroke="orange" strokeLinecap="square" strokeWidth="5" />
        <circle {...bind()} fill="orange" cx={startX} cy={startY} r="12" />
        <circle ref={targetRef} cx="0" cy="0" r="12" fill={attached ? 'orange' : 'yellow'} />
      </svg>
    </div>
  );
}
