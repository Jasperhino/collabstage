import React, { useEffect, useState } from 'react';
import { IPlayState } from '@server/types';
import MobileDialog from './MobileDialog';
import { IPlay, IStep } from '@server/types/play';
import MobileStage from './MobileStage';
import MobileSpellInteraction from './MobileSpellInteraction';

interface ISharedPlayProps {
  playState: IPlayState;
  play: IPlay;
}

export default function MobilePlay({ playState, play }: ISharedPlayProps) {
  const [step, setStep] = useState<IStep | undefined | null>(null);

  useEffect(() => {
    const currentBranch = play.script.find((e) => e.id == playState.currentBranchId);

    setStep(currentBranch?.steps[playState.currentStepIndex]);
    
  }, [playState, play]);

  //Render Interaction or Dialog Screen dependent on playState

  return (
    <>
      {step  && <MobileDialog step={step} />}
      {step && step.type == 'interaction' && <MobileSpellInteraction step={step} />}
    </>
  );
}
//
