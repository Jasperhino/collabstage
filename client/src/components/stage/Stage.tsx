import React, { useEffect } from 'react';
import { ISession, IStageState } from '@server/types';
import { IPlay } from '@server/types/play';
import { useNavigate } from 'react-router-dom';
import MobileStage from '../mobilestage/MobileStage';
import SharedStage from '../sharedstage/SharedStage';

interface IStageProps {
  state: IStageState | null;
  play: IPlay | null;
  session: ISession | null;
}
export default function Stage({ state, play, session }: IStageProps) {
  const navigate = useNavigate();

  return (
    <>
      {session && state && state.actors.map((a) => a.sessionId).includes(session.sessionId) ? (
        <MobileStage play={play} state={state} sessionId={session.sessionId} />
      ) : (
        <SharedStage play={play} state={state} />
      )}
    </>
  );
}
