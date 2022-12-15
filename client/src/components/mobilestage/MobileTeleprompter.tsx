import React, { Ref, useEffect, useRef, useState } from 'react';
import { IPlayState } from '@server/types';
import { IPlay, IStep } from '@server/types/play';
import { stepDone } from 'src/services/stageService';
import MobileDialogMessage from './MobileDialogMessage';
import { useNavigate } from 'react-router-dom';

import { useSound } from 'use-sound';
import classNames from 'classnames';

interface ISharedDialogProps {
  currentStep: IStep;
  play: IPlay;
  playState: IPlayState;
  character: string;
}
export default function MobileTeleprompter({ currentStep, play, playState, character }: ISharedDialogProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const autoscroll = true;
  const navigate = useNavigate();

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

  useEffect(() => {
    if (autoscroll) {
      const i = playState.currentStepIndex;
      refs[i].current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [playState]);

  function handleButton() {
    console.log('Sending step done');
    stepDone();
  }

  window.onpopstate = () => {
    setModalOpen(true);
  };

  return (
    <div
      className="flex-col w-screen h-screen items-center bg-opacity-50 -z-100 overflow-auto "
      style={{ ...backdrop }}
    >
      <div className="-z-10">
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

        <button className="fixed bottom-0 w-full h-12 text-white bg-opacity-100 bg-neutral">
          {currentStep.character} Speaking...
        </button>

        {currentStep.character === character && (
          <button className="fixed bottom-0 w-full h-12 text-white bg-opacity-100 bg-primary" onClick={handleButton}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
