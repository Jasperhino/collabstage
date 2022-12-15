import React from 'react';
import { IStageOptions } from '@server/types';
import { atom, useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { createStage } from '../../services/stageService';
import PlayPicker from './PlayPicker';
import Navbar from '../layout/Navbar';

const creatingAtom = atom<boolean>(false);

export default function CreateStage() {
  const navigate = useNavigate();

  const [creating, setCreating] = useAtom(creatingAtom);

  const handleButton = async () => {
    setCreating(true);

    const stageId = await createStage({ scenario: 'hogwarts' } as IStageOptions).catch((err) => {
      alert(err);
    });
    setCreating(false);
    if (stageId) {
      navigate(`/stage/${stageId}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="hero min-h-screen base-content bg-neutral-focus">
        <div className="hero-content text-center">
          <div className="max-w-l place-content-center bg-neutral-focus " style={{ overflow: 'none' }}>
            <p className="text-primary text-2xl font-semibold " style={{ marginBottom: '2%' }}>
              Select a play for your stage
            </p>
            <PlayPicker />
            <button
              className="btn text-white btn-primary m-4 scale-125"
              style={{ marginTop: '6%' }}
              onClick={handleButton}
              disabled={creating}
            >
              Create Shared Play
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
