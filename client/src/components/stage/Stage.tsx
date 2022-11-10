import { atom, useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import socketService from '../../services/socketService';
import stageService from '../../services/stageService';
import HeroLayout from '../layout/HeroLayout';

const socketAtom = atom<Socket | null>(null);

export default function Stage() {
  const [socket, setSocket] = useAtom(socketAtom);
  useEffect(() => {
    const socket = socketService.socket;
    setSocket(socket);
    if (!socket) {
      console.warn('No socket');
      return;
    }
    stageService.onStageUpdate(socket, (stage) => {
      console.log('Stage: ', stage);
    });
  }, []);

  function handleButton(): void {
    if (!socket) {
      console.warn('Could not send button Press. No socket');
      return;
    }
    stageService.castSpell(socket, { spell: 'stupor' });
  }

  return (
    <HeroLayout>
      <h1>Mobile Stage</h1>
      <p>This is supposed to be shown on the mobiles</p>
      <button className="btn btn-primary" onClick={handleButton}>
        Test me!
      </button>
    </HeroLayout>
  );
}
