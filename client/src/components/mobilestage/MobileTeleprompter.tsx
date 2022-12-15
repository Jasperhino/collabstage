import React, { Ref, useEffect, useRef, useState } from 'react';
import { IPlayState } from '@server/types';
import { IPlay, IStep } from '@server/types/play';
import { stepDone } from 'src/services/stageService';
import MobileDialogMessage from './MobileDialogMessage';
import { useNavigate } from 'react-router-dom';
import sound1 from '../sounds/sound1.mp3';
import sound2 from '../sounds/sound2.mp3';
import classroom from '../sounds/School Students 1 - QuickSounds.com.mp3';
import homeIcon from '/assets/icons/home.png';
import volume from '/assets/icons/volume.png';
import mute from '/assets/icons/mute.png';

import { useSound } from 'use-sound';


interface ISharedDialogProps {
  currentStep: IStep;
  play: IPlay;
  playState: IPlayState;
  character: string;
}
export default function MobileTeleprompter({ currentStep, play, playState, character }: ISharedDialogProps) {
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

  console.log('refs', refs);

  const bind = () =>
    useDoubleTap((event) => {
      console.log('Double tapped');
    });

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

  function handleLeave() {
    // Navigate to the main screen when the button is clicked
    navigate('/');
  }



  // Create state
  const state = {

    // Get audio file in a variable
    audio: new Audio(classroom),

    // Set initial state of song
    isPlaying: false,
  };

  // Main function to handle both play and pause operations
  const playPause = () => {

    // Get state of song
    let isPlaying = state.isPlaying;

    console.log("Is playing? " + isPlaying);

    if (isPlaying) {
      // Pause the song if it is playing
      state.audio.pause();
    } else {
      // Play the song if it is paused
      state.audio.play();
    }
    state.isPlaying = !isPlaying;
    // Change the state of song
    useState({ isPlaying: !isPlaying });
  };


  return (
    <div

      {...bind}
      className="flex-col w-screen h-screen items-center bg-opacity-50 -z-100 overflow-auto "
      style={{ ...backdrop }}
    >

      <div className="fixed navbar bg-neutral bg-opacity-100 " style={{ zIndex: '10' }} >
        <div className="navbar-start bg-opacity-100">
          <a className="btn btn-ghost normal-case text-xl bg-opacity-100">
            <button onClick={handleLeave} className="btn btn-primary bg-opacity-100">
              <div className="avatar ">
                <div className="w-8">
                  <img src={homeIcon} />
                </div>
              </div>

            </button></a>
        </div>
        <div className="navbar-end bg-opacity-100" >
          <button onClick={playPause} className="btn btn-primary bg-opacity-100">
            {state.isPlaying ?
              <div className="avatar ">
                <div className="w-8">
                  <img src={volume} />
                </div>
              </div>
              :
              <div className="avatar ">
                <div className="w-8">
                  <img src={mute} />
                </div>
              </div>

            }
          </button>



        </div>
      </div>

  
      <div style={{ marginTop: '64px', marginBottom: '64px', zIndex: '-10' }}>
        {steps.map((step) => (
          <div ref={refs[step.key]} key={step.key} >
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
        {(
          <button className="fixed bottom-0 w-full h-12  text-white bg-opacity-100 bg-neutral" >
            {currentStep.character} Speaking...
          </button>
        )}
        {currentStep.character === character && (
          <button className="fixed bottom-0 w-full h-12 text-white bg-opacity-100 bg-primary" onClick={handleButton}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

function useDoubleTap(arg0: (event: any) => void) {
  throw new Error('Function not implemented.');
}
///*{play?.script.slice(0, playState?.currentStepIndex).map((line, i) => (
