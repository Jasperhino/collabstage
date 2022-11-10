import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect } from 'react';
import socketService from '../../services/socketService';
import { useNavigate, useParams } from 'react-router-dom';
import { IActorJoinedMessage, ISpellMessage, IStageState } from '@server/types';
import ActorList from './ActorList';

interface IToast {
  message: string;
}

export default function SharedStage() {
  const navigate = useNavigate();
  const { stageId } = useParams();
  const [toasts, updateToasts] = useState<IToast[]>([]);
  const [state, setState] = useState<IStageState | null>(null);

  useEffect(() => {
    const socket = socketService.socket;
    if (!socket) {
      console.error('No socket');
      //navigate('/');
      return;
    }
    if (!stageId) {
      console.error('No stageId');
      return;
    }
    socket.on('actor_joined', (message: IActorJoinedMessage) => {
      console.log(`${message.actorName} joined the Stage `);
      updateToasts((toasts) => [...toasts, { message: `${message.actorName} joined` }]);
    });

    socket.on('stage_update', (state) => {
      console.log('Stage: ', state);
      setState(state);
    });

    socket.on('cast_spell', (spell: ISpellMessage) => {
      console.log('Spell: ', spell);
    });
  }, []);

  const backdrop = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/backgrounds/hogwarts.jpg')`,
  };

  return (
    <div className="flex w-screen h-screen items-center bg-opacity-50" style={backdrop}>
      <div className="flex flex-row justify-center mx-32">
        <div className="card bg-base-100 shadow-xl mx-8">
          <a href={'join'} target="_blank" rel="noreferrer">
            <QRCodeSVG className="m-4" value={`${window.location.host}/stage/join/${stageId}`} size={400} />
          </a>
        </div>
        <div className="card w-1/3 h-full bg-base-100 shadow-xl mx-8">
          <div className="card-body">
            <h1 className="card-title text-6xl">{state ? state.stageId : 'XXXX'}</h1>
            <p className="text-left">Scan the QR-Code or enter the code above to join this stage.</p>
          </div>
        </div>
        {state && <ActorList actors={state.actors} />}
      </div>

      <div className="toast toast-top">
        {toasts.map((toast: IToast, i) => (
          <div key={i} className="alert h-10 bg-base-100">
            <div>
              <span>{toast.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
