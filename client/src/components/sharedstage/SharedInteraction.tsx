import React, { useEffect, useState } from 'react';
import { ISpellMessage } from '@server/types';
import { IStep } from '@server/types/play';
import socketService from '../../services/socketService';
import Feather from './Feather';

export default function SharedSpellInteraction({ step }: { step: IStep }) {
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
      return;
    }

    socket.on('cast_spell', (spell: ISpellMessage) => {
      if (spell.strength > 0) {
        letFeatherFly();
      }
    });
  }, []);

  return (
    <div className="fixed bottom-0 left-1/4 scale-150">
      <Feather flying={flying} />{' '}
    </div>
  );
}
