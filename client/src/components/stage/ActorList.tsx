import React from 'react';

interface IActorListProps {
  actors: string[];
}

export default function ActorList(props: IActorListProps) {
  return (
    <div className="card h-full bg-base-100 shadow-xl justify-start items-center">
      {props.actors.map((actor, i) => (
        <div key={i} className="stat p-4">
          <div className="stat-figure">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src="https://placeimg.com/128/128/people" />
              </div>
            </div>
          </div>
          <div className="stat-value">{actor}</div>
          <div className="stat-title">selecting character...</div>
        </div>
      ))}
    </div>
  );
}
