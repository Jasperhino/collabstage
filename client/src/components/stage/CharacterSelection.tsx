import React, { useState } from 'react';
import { IStageOptions, IStageState } from '@server/types';
import { Link, useNavigate } from 'react-router-dom';
import myData from '../stage/hogwarts.json';
import Explanation from './Explanation';

interface ICharacterSelectionProps {
    state: IStageState
}
export default function CharacterSelection({state}: ICharacterSelectionProps) {
    return (
        <ul className="menu" >
            {myData.characters.map((character, i) => (
                <li>
                    <Link to={{
                        pathname: `${character.name.split(' ')[0]}`
                    }}
                        state={{ character: JSON.stringify(character) }}>
                        <a className="card-title">
                            <img src={character.img} ></img>
                            {character.name}
                        </a>
                    </Link>
                </li>
            ))};
        </ul>
    )
}





