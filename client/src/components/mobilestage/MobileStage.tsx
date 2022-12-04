import { IStageState } from '@server/types';
import React, { useEffect } from 'react';
import { castSpell } from '../../services/stageService';
import HeroLayout from '../layout/HeroLayout';
import socketService from 'src/services/socketService';

interface IMobileStageProps {
  state: IStageState;
}

export default function MobileStage({ state }: IMobileStageProps) {
  useEffect(() => {
    const s = socketService.socket;
    s.on;
  }, []);
  function handleButton(): void {
    console.log('Sending button press');
    castSpell({ spell: 'stupor' });
  }

  return (
    <HeroLayout>
      <h1>Mobile Stage</h1>
      <p>This is supposed to be shown on the mobiles</p>
      <button className="btn btn-primary" onClick={handleButton}>
        Wingardium leviosa
      </button>
      {play && <p>Play: {play.name}</p>}
    </HeroLayout>
  );
}
