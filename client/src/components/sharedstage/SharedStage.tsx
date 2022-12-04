import React, { useState, useEffect } from 'react';
import socketService from '../../services/socketService';
import { useNavigate, useParams } from 'react-router-dom';

import SharedLobby from './SharedLobby';
import SharedPlay from './SharedPlay';
import { IStageState } from '@server';

interface IToast {
  message: string;
}

export default function SharedStage() {
  const navigate = useNavigate();
  const { stageId } = useParams();
  const [toasts, updateToasts] = useState<IToast[]>([]);
  const [state, setState] = useState<IStageState | null>(null);

  function pushToast(message: string) {
    updateToasts([...toasts, { message }]);
  }

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
      console.log(`${message.actorName} joined the Stage`);
      updateToasts((toasts) => [...toasts, { message: `${message.actorName} joined` }]);
    });

    socket.on('stage_update', (state) => {
      console.log('Stage: ', state);
      setState(state);
    });
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
      {state && state.status == IStageStatus.IN_PROGRESS && (
        <SharedPlay playState={state.playState} scenario={state.scenario} />
      )}
    </>
  );
}
