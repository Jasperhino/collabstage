import React from 'react';
import { IActor } from '@server/types';
import { IPlay } from '@server/types/play';

interface IActorListProps {
  actors: IActor[];
  play: IPlay;
}

export default function ActorList({ actors, play }: IActorListProps) {
  return (
    <div className="card h-full bg-base-100 shadow-xl justify-start items-center">
      {actors.map((actor, i) => (
        <div key={i} className="stat p-4 border-1">
          <div className="stat-figure">
            <div className="avatar online">
              <div className="w-16 rounded-full">
              {actor.character === "Harry Potter" ? (
                  <img src = "/assets/icons/Harry.png"></img>
              ) :  actor.character === "Ron Weasley" ? (
                <img src = "/assets/icons/Ron.png"></img>
              ) :   actor.character === "Hermione Granger" ? (
                <img src = "/assets/icons/Hermione.png"></img>
              ) : (
                <img src = "https://garden.spoonflower.com/c/12555623/p/f/m/A3en3iajK6aHrv_Pq3lI60RwBmv3v9OHGm_R36_ngOuN-eEIoPbsf2g/Caspian%20Solid%209db6d1%20Color%20Map%20Q23%20Solid%20Color%20.jpg"></img>
              )}
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
