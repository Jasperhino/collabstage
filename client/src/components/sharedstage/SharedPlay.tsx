import React, { useEffect, useState } from 'react';
import { IPlayState } from '@server/types';
import SharedDialog from './SharedDialog';
import SharedInteraction from './SharedInteraction';
import { IPlay, IStep } from '@server/types/play';

interface ISharedPlayProps {
  playState: IPlayState;
  play: IPlay;
}

export default function SharedPlay({ playState, play }: ISharedPlayProps) {
  const [step, setStep] = useState<IStep | undefined | null>(null);

  useEffect(() => {
    const currentBranch = play.script.find((e) => e.id == playState.currentBranchId);

    setStep(currentBranch?.steps[playState.currentStepIndex]);
  }, [playState, play]);

  //Render Interaction or Dialog Screen dependent on playState

  return (
    <>
      {step && <SharedDialog step={step} />}
      {step && step.type == 'interaction' && <SharedInteraction step={step} />}
    </>
  );
}
