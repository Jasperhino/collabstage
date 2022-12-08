import React from 'react';
import { IStageOptions } from '@server/types';
import { atom, useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { createStage } from '../../services/stageService';
import PlayPicker from './PlayPicker';

const creatingAtom = atom<boolean>(false);

function CreateStage() {
  const navigate = useNavigate();

  const [creating, setCreating] = useAtom(creatingAtom);

  const handleButton = async () => {
    setCreating(true);

    const stageId = await createStage({ scenario: 'hogwarts' } as IStageOptions).catch((err) => {
      alert(err);
    });
    setCreating(false);
    if (stageId) {
      navigate(`/stage/${stageId}/shared`);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <p>Select a play for your stage.</p>
          <PlayPicker />
          <button className="btn btn-primary m-4" onClick={handleButton} disabled={creating}>
            Create Play
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateStage;
