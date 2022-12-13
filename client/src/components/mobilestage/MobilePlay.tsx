import React, { useEffect, useState } from 'react';
import { IPlayState } from '@server/types';
import MobileTeleprompter from './MobileTeleprompter';
import { IPlay, IStep } from '@server/types/play';
import MobileStage from './MobileStage';
import MobileSpellInteraction from './MobileSpellInteraction';

interface ISharedPlayProps {
  playState: IPlayState;
  play: IPlay;
  character: string;
}

export default function MobilePlay({ playState, play, character }: ISharedPlayProps) {
  const [step, setStep] = useState<IStep | undefined | null>(null);

  useEffect(() => {
    if (!playState || !play) return;
    const currentBranch = play.script.find((e) => e.id == playState.currentBranchId);
    if (!currentBranch) return;
    setStep(currentBranch.steps[playState.currentStepIndex]);
  }, [playState, play]);

  return (
    <>
      {step && (step.type == 'dialog' || (step.type == 'interaction' && character != step.character)) && (
        <MobileTeleprompter currentStep={step} play={play} playState={playState} character={character} />
      )}
      {step && step.type == 'interaction' && character == step.character && (
        <MobileSpellInteraction step={step} character={character} />
      )}
    </>
  );
}
//
