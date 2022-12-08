import { IStep } from '@server/types/play';
import React, { useEffect, useState } from 'react';
import socketService from '../../services/socketService';
import Feather from '../stage/Feather';

export default function SharedInteraction({ step }: { step: IStep }) {
  const [flying, setFlying] = useState<boolean>(false);

  const letFeatherFly = () => {
    if (flying) {
      return;
    }
    setFlying(true);
    setTimeout(() => {
      setFlying(false);
    }, 1000 * 10);
  };

  useEffect(() => {
    const socket = socketService.socket;
    if (!socket) {
      console.error('No socket');
      //navigate('/');
      return;
    }

    socket.on('cast_spell', (spell: ISpellMessage) => {
      letFeatherFly();
    });
  }, []);

  return <Feather flying={flying} />;
}
