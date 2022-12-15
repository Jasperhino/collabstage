import { IPlay, IStep } from '@server/types/play';
import React, { useEffect, useState } from 'react';
import { stepBack, stepDone } from '../../services/stageService';

interface ISharedDialogProps {
  step: IStep;
  play: IPlay;
}

export default function SharedDialog({ step, play }: ISharedDialogProps) {
  const backdrop = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${play.background}')`,
  };

  //This button is only for testing purposes, it should be removed later
  function handleButton() {
    stepDone();
  }

  return (
    <div className="flex w-screen h-screen items-end bg-opacity-50 -z-100 overflow-auto" style={backdrop}>
      <img src={step.avatar} className="max-w-lg rounded-xl shadow-2xl" alt={step.avatar} />
      <div className="card w-1/2 bg-base-100 shadow-xl m-16">
        <div className="card-body">
          <div className="card-title">
            <span className="text-6xl">{step.character}</span>
            <h2 className="ml-4 opacity-50 text-3xl">({step.emotion})</h2>
          </div>
          <p className="text-6xl">{step.text}</p>
          <div className="card-actions justify-end mt-8">
            <button onClick={stepBack} className="btn btn-primary">
              Back
            </button>
            <button onClick={handleButton} className="btn btn-primary">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
