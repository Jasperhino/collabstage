import React, { useState, useEffect } from 'react';
import socketService from '../../services/socketService';
import { useNavigate, useParams } from 'react-router-dom';

import SharedLobby from './SharedLobby';
import SharedPlay from './SharedPlay';
import { IActorJoinedMessage, IStageState, IStageStatus } from '@server/types';
import { IPlay } from '@server/types/play';

interface IToast {
  message: string;
}

interface ISharedStageProps {
  play: IPlay | null;
  state: IStageState | null;
}

export default function SharedStage({ play, state }: ISharedStageProps) {
  const navigate = useNavigate();
  const [toasts, updateToasts] = useState<IToast[]>([]);

  function pushToast(message: string) {
    updateToasts([...toasts, { message }]);
  }

  useEffect(() => {
    const socket = socketService.socket;
    if (!socket) {
      console.error('No socket');
      navigate('/');
      return;
    }
    socket.on('actor_joined', (message: IActorJoinedMessage) => {
      console.log(`${message.actorName} joined the Stage`);
      pushToast(`${message.actorName} joined`);
    });

    return () => {
      socket.removeListener('actor_joined');
    };
  }, []);

  return (
    <>
      <div className="toast toast-top">
        {toasts.map((toast: IToast, i) => (
          <div key={i} className="alert h-10 bg-base-100">
            <div>
              <span>{toast.message}</span>
            </div>
          </div>
        ))}
      </div>
      {state && state.status == IStageStatus.NOT_STARTED && <SharedLobby state={state} />}
      {state && play && state.status == IStageStatus.IN_PROGRESS && (
        <SharedPlay playState={state.playState} play={play} />
      )}
    </>
  );
}
