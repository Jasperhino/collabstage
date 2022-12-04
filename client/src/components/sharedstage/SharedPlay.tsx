import React, { useEffect, useState } from 'react';
import { IPlayState } from '@server/types';
import SharedDialog from './SharedDialog';
import SharedInteraction from './SharedInteraction';

interface ISharedPlayProps {
  playState: IPlayState;
  scenario: string;
}

export default function SharedPlay({ playState, scenario }: ISharedPlayProps) {
  const [step, setStep] = useState<IStep | null>(null);

  useEffect(() => {
    const currentBranch = play.script.find((e) => e.id == playState.currentBranchId);
    if (!currentBranch) {
      console.error(`No branch found for ${playState.currentBranchId} in ${scenario}`);
      return;
    }

    setStep(currentBranch.steps[playState.currentStepIndex]);
  }, [playState]);

  //Render Interaction or Dialog Screen dependent on playState

  return (
    <>
      {step && step.type == 'dialog' && <SharedDialog step={step} />}
      {step && step.type == 'interaction' && <SharedInteraction step={step} />}
    </>
  );
}