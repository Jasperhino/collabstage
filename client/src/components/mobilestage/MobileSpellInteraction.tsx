import React, { useState } from 'react';
import { useDrag } from '@use-gesture/react';
import { IStep } from '@server/types/play';
import { castSpell, stepDone } from 'src/services/stageService';
import MobileDialogMessage from './MobileDialogMessage';
import Torch from './Torch';
import ParticlesContainer from './ParticlesContainer';

export default function MobileSpellInteraction({ step, character }: { step: IStep; character: string }) {
  const [torchOn, setTorchOn] = useState(false);
  const [dragging, setDragging] = useState(false);
  let castingSpell = false;

  const bind = useDrag(({ xy: [x, y], active, last, movement: [mx, my] }) => {
    setDragging(active);
    console.log(`Dragging x: ${x}, y: ${y}, active: ${active}, last: ${last}, mx: ${mx}, my: ${my}`);
    if (last && Math.abs(mx) > 20 && Math.abs(my) > 20) {
      spellComplete();
      setDragging(false);
    }
  });

  function spellComplete() {
    if (castingSpell) return;
    castingSpell = true;
    console.log('vibrate', navigator.vibrate(200));
    setTorchOn(true);
    setTimeout(() => {
      setTorchOn(false);
      console.log('off');
      if (step.interaction && step.interaction.type == 'spell') {
        console.log('Casting spell', step.interaction.spell, step.interaction.strength);
        castSpell({ spell: 'wengadium leviosa', strength: step.interaction.strength });
      }
      stepDone();
      castingSpell = false;
    }, 500);
  }

  return (
    <div {...bind()} className="flex items-center justify-center m-4 h-screen sm:w-96 m-auto relative touch-none">
      <Torch torchOn={torchOn} />
      <ParticlesContainer />
      {!dragging && <img src="/assets/icons/touch.svg" alt="touch" className="w-64 z-10" />}
      <div className="absolute top-0 left-0 w-full h-full z-1">
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
