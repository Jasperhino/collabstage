import React, { useEffect, useState } from 'react';
import { ISpellMessage } from '@server/types';
import { IStep } from '@server/types/play';
import socketService from '../../services/socketService';
import Feather from './Feather';
import useSound from 'use-sound';
import sound from '/assets/sounds/spell.mp3';

export default function SharedSpellInteraction({ step }: { step: IStep }) {
  const [flying, setFlying] = useState<boolean>(false);
  const [play] = useSound(sound);

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
        play();
        letFeatherFly();
      }
    });
  }, []);

  return (
    <div className="fixed bottom-0 right-0 mr-16">
      <Feather flying={flying} />
    </div>
  );
}
