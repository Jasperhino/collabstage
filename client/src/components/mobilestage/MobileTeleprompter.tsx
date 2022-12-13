import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect } from 'react';
import socketService from '../../services/socketService';
import { useNavigate, useParams } from 'react-router-dom';
import { IActorJoinedMessage, IPlayState, ISpellMessage, IStageState } from '@server/types';
import { IPlay, IStep } from '@server/types/play';
import { ChatBubble } from 'daisyui';
import { stepDone } from 'src/services/stageService';
import PlayPicker from '../stage/PlayPicker';
import MobileDialogMessage from './DialogMessage';

interface ISharedDialogProps {
  currentStep: IStep;
  play: IPlay;
  playState: IPlayState;
  character: string;
}
export default function MobileTeleprompter({ currentStep, play, playState, character }: ISharedDialogProps) {
  const backdrop = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('${play.background}')`,
  };
  const branch = play.script.find((e) => e.id == playState.currentBranchId);
  if (!branch) return null;
  const steps = branch.steps.map((step, i) => ({
    ...step,
    state: i < playState.currentStepIndex ? 'done' : i === playState.currentStepIndex ? 'current' : 'upcoming',
    right: step.character === character,
    key: i,
  }));

  console.log(steps);

  function handleButton() {
    stepDone(currentStep.character);
  }

  return (
    <div className="flex-col w-screen h-screen items-center bg-opacity-50 -z-100 overflow-auto " style={backdrop}>
      {steps.map((step) => (
        <MobileDialogMessage
          key={step.key}
          character={step.character}
          avatar={step.avatar}
          text={step.text}
          emotion={step.emotion}
          state={step.state}
          right={step.right}
        />
      ))}
      <button className="fixed bottom-0 w-full h-12 bg-primary text-white" onClick={handleButton}>
        Next
      </button>
    </div>
  );
}

///*{play?.script.slice(0, playState?.currentStepIndex).map((line, i) => (
