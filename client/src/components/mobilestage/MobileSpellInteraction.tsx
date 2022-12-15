import React, { useState } from 'react';
import { useDrag } from '@use-gesture/react';
import { IStep } from '@server/types/play';
import { stepDone } from 'src/services/stageService';
import MobileDialogMessage from './DialogMessage';
import Torch from './Torch';
import ParticlesContainer from './ParticlesContainer';

export default function MobileSpellInteraction({ step, character }: { step: IStep; character: string }) {
  const [torchOn, setTorchOn] = useState(false);

  let castingSpell = false;

  const bind = useDrag(({ xy: [x, y], active, last, movement: [mx, my] }) => {
    console.log(`Dragging x: ${x}, y: ${y}, active: ${active}, last: ${last}, mx: ${mx}, my: ${my}`);
    if (last) {
      spellComplete();
    }
  });

  function spellComplete() {
    if (castingSpell) return;
    castingSpell = true;
    console.log('Spell complete');
    console.log('vibrate', navigator.vibrate(200));
    setTorchOn(true);
    setTimeout(() => {
      setTorchOn(false);
      console.log('off');
      stepDone();
      castingSpell = false;
    }, 500);
  }

  return (
    <div {...bind()} className="flex items-center justify-center m-4 h-screen sm:w-96 m-auto relative touch-none">
      <Torch torchOn={torchOn} />
      <ParticlesContainer />
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
    </div>
  );
}
