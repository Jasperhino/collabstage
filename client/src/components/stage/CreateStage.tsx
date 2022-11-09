import { atom, useAtom } from 'jotai';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import socketService from '../../services/socketService';
import stageService from '../../services/stageService';
import PlayPicker from './PlayPicker';

const creatingAtom = atom<boolean>(false);

function CreateStage() {
  const navigate = useNavigate();

  const [creating, setCreating] = useAtom(creatingAtom);

  const createStage = async () => {
    const socket = socketService.socket;
    if (!socket) {
      console.error('No socket');
      return;
    }
    setCreating(true);

    const stageId = await stageService.createStage(socket, { scenario: 'hogwarts' }).catch((err) => {
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
          <button className="btn btn-primary m-4" onClick={createStage} disabled={creating}>
            Create Play
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateStage;
