import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect } from 'react';
import HeroLayout from '../layout/HeroLayout';
import socketService from '../../services/socketService';
import { useNavigate, useParams } from 'react-router-dom';
import stageService from '../../services/stageService';
import { IActorJoinedMessage, ISpellMessage, IStageState } from '@server/types';

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
      navigate('/');
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

  return (
    <HeroLayout>
      <div
        style={{
          backgroundImage: `url(/image.png'})`,
        }}
      ></div>
      <div className="py-6">
        <h2>SharedStage</h2>
        <p>Waiting for fellow actors...</p>
      </div>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <div className="flex m-4 flex-row items-center">
          <a href={'join'} target="_blank" rel="noreferrer">
            <QRCodeSVG value={`${window.location.host}/stage/join/${stageId}`} size={200} />
          </a>
          <div className="card-body">
            <h1 className="card-title text-6xl">{state && state.stageId}</h1>
            <p className="text-left">Scan the QR-Code or enter the code above to join this stage.</p>
          </div>
        </div>
      </div>

      <div className="toast toast-top">
        {toasts.map((toast: IToast, i) => (
          <div key={i} className="alert bg-base-100">
            <div>
              <span>{toast.message}</span>
            </div>
          </div>
        ))}
      </div>
    </HeroLayout>
  );
}
