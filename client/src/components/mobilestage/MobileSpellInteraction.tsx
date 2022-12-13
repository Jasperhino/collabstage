import React, { useState, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { IStep } from '@server/types/play';
import { stepDone } from 'src/services/stageService';
import MobileDialogMessage from './DialogMessage';
import Flashlight from './Flashlight';

export default function MobileSpellInteraction({ step, character }: { step: IStep; character: string }) {
  const startX = 0;
  const startY = -500;
  const targetRef = useRef(null);
  const [{ x2, y2 }, api] = useSpring(() => ({ x2: startX, y2: startY }));
  const [dragging, setDragging] = useState(false);
  const [attached, setAttached] = useState(false);
  const [torchOn, setTorchOn] = useState(false);

  const bind = useDrag(({ xy: [x, y], active, last, movement: [mx, my] }) => {
    setDragging(active);
    //setAttached(document.elementFromPoint(x, y) === targetRef.current);
    console.log(`Dragging x: ${x}, y: ${y}, active: ${active}, last: ${last}, mx: ${mx}, my: ${my}`);
    if (last) {
      spellComplete();
    }
  });

  function spellComplete() {
    console.log('Spell complete');
    console.log('vibrate', navigator.vibrate(200));
    // setTorchOn(true);
    // setTimeout(() => {
    //   setTorchOn(false);
    // }, 1000);
  }

  return (
    <div {...bind()} className="flex items-center justify-center m-4 h-screen sm:w-96 m-auto relative touch-none">
      <div className="absolute top-0 left-0 w-full h-full">
        <img src="/assets/wand.png" alt="wand" className="w-96" />
      </div>
      <div className="absolute top-0 left-0 w-full h-full">
        <MobileDialogMessage
          character={step.character}
          avatar={step.avatar}
          text={step.text}
          emotion={step.emotion}
          right={step.character === character}
          state={'current'}
        />
      </div>
      <Flashlight torchOn={torchOn} />
    </div>
  );
}
