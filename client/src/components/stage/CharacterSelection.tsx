import React from 'react';
import { IStageState } from '@server/types';
import { IPlay } from '@server/types/play';
import { selectCharacter } from 'src/services/stageService';
//import classNames from 'classnames';

interface ICharacterSelectionProps {
  state: IStageState;
  play: IPlay;
}

export default function CharacterSelection({ state, play }: ICharacterSelectionProps) {
  // const isSelected = (characterName: string) => {
  //   return characterName == state.;
  // }
  function handleClick(characterName: string) {
    console.log('selected character: ', characterName);
    selectCharacter(characterName);
  }

  return (
    <ul className="menu">
      {play.characters.map((character, i) => (
        <div key={i} className="flex m-4 items-center hover:bg-primary" onClick={() => handleClick(character.name)}>
          <div className="avatar">
            <div className="w-24 rounded">
              <img src={character.avatar} />
            </div>
          </div>
          <p className="mx-4">{character.name}</p>
        </div>
      ))}
    </ul>
  );
}
