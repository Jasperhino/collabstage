import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  useEffect(() => {
    const socket = socketService.socket;
    if (!socket) {
      console.error('No socket');
      navigate('/');
      return;
    }
    socket.on('actor_joined', (message: IActorJoinedMessage) => {
      console.log(`${message.actorName} joined the Stage`);
      toast(`${message.actorName} joined`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    });

    return () => {
      socket.removeListener('actor_joined');
    };
  }, []);

  return (
    <>
      {state && state.status == IStageStatus.NOT_STARTED && <SharedLobby state={state} />}
      {state && play && state.status == IStageStatus.IN_PROGRESS && (
        <SharedPlay playState={state.playState} play={play} />
      )}
      <ToastContainer />
    </>
  );
}
