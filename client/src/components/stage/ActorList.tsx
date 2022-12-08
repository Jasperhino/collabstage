import React from 'react';
import { IActor } from '@server/types';

interface IActorListProps {
  actors: IActor[];
}

export default function ActorList({ actors }: IActorListProps) {
  return (
    <div className="card h-full bg-base-100 shadow-xl justify-start items-center">
      {actors.map((actor, i) => (
        <div key={i} className="stat p-4 border-1">
          <div className="stat-figure">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src="https://placeimg.com/128/128/people" />
              </div>
            </div>
          </div>
          <div className="stat-value">{actor.name}</div>
          <div className="stat-title">{actor.character ? actor.character : 'selecting character...'}</div>
        </div>
      ))}
    </div>
  );
}
