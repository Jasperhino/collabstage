import { IStep } from '@server/types/play';
import React, { useEffect, useState } from 'react';
import { stepDone } from '../../services/stageService';

interface ISharedDialogProps {
  step: IStep;
}

export default function SharedDialog({ step }: ISharedDialogProps) {
  const backdrop = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/backgrounds/hogwarts.jpg')`,
  };

  //This button is only for testing purposes, it should be removed later
  function handleButton() {
    stepDone(step.character);
  }

  return (
    <div className="flex w-screen h-screen items-center bg-opacity-50 -z-100 overflow-auto" style={backdrop}>
      <div className="hero min-h-screen   bg-opacity-0 -z-100 bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src={step.avatar} className="max-w-sm rounded-lg shadow-2xl" alt={step.avatar} />
          <div className="DialogWindow">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{step.character}</h2>
                <p>{step.text}</p>
                <div className="card-actions justify-end">
                  <button onClick={handleButton} className="btn btn-primary">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
