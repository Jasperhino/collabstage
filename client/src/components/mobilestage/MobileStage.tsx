import React, { useEffect } from 'react';
import { IStageState } from '@server/types';
import { castSpell } from '../../services/stageService';
import HeroLayout from '../layout/HeroLayout';
import socketService from 'src/services/socketService';

export default function MobileStage() {
  useEffect(() => {
    const s = socketService.socket;
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
    </HeroLayout>
  );
}
