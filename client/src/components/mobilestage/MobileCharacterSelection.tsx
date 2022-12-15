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
  const backdrop = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('${play.background}')`,
  };
  return (
    <div className="flex-col w-screen h-screen items-center bg-opacity-50 -z-100 overflow-auto "
      style={backdrop}>
      <ul className="menu rounded-box">
        {play.characters.map((character, i) => (
          <li>
            <div key={i} className="flex m-4 items-center bg-white hover:bg-primary" onClick={() => handleClick(character.name)}>
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={character.avatar} />
                </div>
              </div>
              <p className="mx-4">{character.name}</p>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
}
