import React, { useEffect, useState } from 'react';
import { ICharacter } from '@server/types/play';
import { IPlay } from '@server/types';
import { selectCharacter } from '../../services/stageService';

interface ICharacterBriefingProps {
  characterName: string;
  play: IPlay;
}

export default function Briefing({ characterName, play }: ICharacterBriefingProps) {
  const [character, setCharacter] = useState<ICharacter | null>(play.characters.find((c) => c.name == characterName));

  function handleClick() {
    selectCharacter(null);
  }

  return (
    <div className="card">
      <figure>
        <img src={character.avatar} alt="Character Avatar" />
      </figure>
      <div className="card-body">
        <h2 className="card-title m-auto">{character.name}</h2>
        <p>{character.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleClick}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
