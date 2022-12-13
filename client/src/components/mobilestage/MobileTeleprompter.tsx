import React, { Ref, useEffect, useRef, useState } from 'react';
import { IPlayState } from '@server/types';
import { IPlay, IStep } from '@server/types/play';
import { stepDone } from 'src/services/stageService';
import MobileDialogMessage from './DialogMessage';

interface ISharedDialogProps {
  currentStep: IStep;
  play: IPlay;
  playState: IPlayState;
  character: string;
}
export default function MobileTeleprompter({ currentStep, play, playState, character }: ISharedDialogProps) {
  const autoscroll = true;

  const backdrop = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('${play.background}')`,
  };
  const branch = play.script.find((e) => e.id == playState.currentBranchId);
  if (!branch) return null;
  const steps = branch.steps.map((step, i) => {
    return {
      ...step,
      state: i < playState.currentStepIndex ? 'done' : i === playState.currentStepIndex ? 'current' : 'upcoming',
      right: step.character === character,
      key: i,
    };
  });

  const refs = steps.reduce((acc, step) => {
    acc[step.key] = React.createRef();
    return acc;
  }, {});

  console.log('refs', refs);

  useEffect(() => {
    if (autoscroll) {
      const i = playState.currentStepIndex;
      console.log('scroll to ', refs[i]);
      refs[i].current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [playState]);

  function handleButton() {
    stepDone(currentStep.character);
  }

  return (
    <div className="flex-col w-screen h-screen items-center bg-opacity-50 -z-100 overflow-auto " style={backdrop}>
      {steps.map((step) => (
        <div ref={refs[step.key]} key={step.key}>
          <MobileDialogMessage
            character={step.character}
            avatar={step.avatar}
            text={step.text}
            emotion={step.emotion}
            state={step.state}
            right={step.right}
          />
        </div>
      ))}
      <button className="fixed bottom-0 w-full h-12 bg-primary text-white" onClick={handleButton}>
        Next
      </button>
    </div>
  );
}

///*{play?.script.slice(0, playState?.currentStepIndex).map((line, i) => (
