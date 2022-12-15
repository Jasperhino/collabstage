import React, { useEffect, useState } from 'react';
import { IPlayState } from '@server/types';
import SharedDialog from './SharedDialog';
import SharedSpellInteraction from './SharedSpellInteraction';
import { IPlay, IStep } from '@server/types/play';

interface ISharedPlayProps {
  playState: IPlayState;
  play: IPlay;
}

export default function SharedPlay({ playState, play }: ISharedPlayProps) {
  const [step, setStep] = useState<IStep | undefined | null>(null);
  const audio = new Audio('/assets/sounds/classroom.mp3');

  useEffect(() => {
    audio.loop = true;
    audio.play();
  }, []);

  useEffect(() => {
    const currentBranch = play.script.find((e) => e.id == playState.currentBranchId);
    setStep(currentBranch?.steps[playState.currentStepIndex]);
  }, [playState, play]);

  return (
    <>
      {step && <SharedDialog step={step} play={play} />}
      {step && <SharedSpellInteraction step={step} />}
    </>
  );
}
