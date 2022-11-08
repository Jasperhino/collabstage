import React from 'react';
import PlayPicker from './PlayPicker';

function createStage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <p>Select a play for your stage.</p>
          <PlayPicker />
          <button className="btn btn-primary m-4">Create Play</button>
        </div>
      </div>
    </div>
  );
}

export default createStage;
