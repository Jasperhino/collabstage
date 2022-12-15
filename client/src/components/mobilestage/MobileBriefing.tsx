import React, { useEffect, useState } from 'react';
import { ICharacter } from '@server/types/play';
import { IPlay } from '@server/types';
import { selectCharacter } from '../../services/stageService';

interface ICharacterBriefingProps {
  character: string;
  play: IPlay;
}

export default function Briefing({ character: characterName, play }: ICharacterBriefingProps) {
  const [character, setCharacter] = useState<ICharacter | null>(play.characters.find((c) => c.name == characterName));

  function handleClick() {
    selectCharacter(null);
  }
  const backdrop = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('${play.background}')`,
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="badge badge-primary ">Waiting for host to start the play...</div>
      </div>
      {character && (
        <div className="card mt-8">
          <figure>
            <img src={character.avatar} alt="Character Avatar" />
          </figure>
          <div className="card-body">
            <h2 className="card-title m-auto">{character.name}</h2>
            <p>{character.description}</p>
            <div className="card-actions justify-center mt-8">
              <button className="btn btn-outline" onClick={handleClick}>
                Choose different Character
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
