import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ActorList from '../stage/ActorList';
import { IActorJoinedMessage, IStageState } from '@server/types';
import { startPlay } from 'src/services/stageService';

interface ISharedLobbyProps {
  state: IStageState;
}

export default function SharedLobby({ state }: ISharedLobbyProps) {
  const backdrop = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/backgrounds/hogwarts.jpg')`,
  };

  return (
    <div className="flex w-screen h-screen items-center bg-opacity-50 -z-100 overflow-auto" style={backdrop}>
      <div className="flex flex-row justify-center mx-32">
        <div className="card h-full bg-base-100 shadow-xl mx-8">
          <a href={'join'} target="_blank" rel="noreferrer">
            <QRCodeSVG className="m-4" value={`${window.location.host}/stage/${state.stageId}/join`} size={400} />
          </a>
        </div>
        <div className="card w-1/3 h-full bg-base-100 shadow-xl mx-8">
          <div className="card-body">
            <h1 className="card-title text-6xl">{state ? state.stageId : 'XXXX'}</h1>
            <p className="text-left">Scan the QR-Code or enter the code above to join this stage.</p>
          </div>
        </div>
        {state && <ActorList actors={state.actors} />}
        <button className="btn btn-primary" onClick={() => startPlay({ stageId: state.stageId })}>
          Start Play
        </button>
      </div>
    </div>
  );
}
