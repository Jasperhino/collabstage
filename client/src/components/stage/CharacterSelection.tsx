import React, { useState } from 'react';
import { IStageOptions } from '@server/types';
import { atom, useAtom } from 'jotai';

import { Link, useNavigate } from 'react-router-dom';
import socketService from '../../services/socketService';
import stageService from '../../services/stageService';
import Home from '../home/Home';
import Harry from '../../../public/characters.png';
import Hermione from '../../../public/character2.png';
import Ron from '../../../public/character3.png';
import myData from '../stage/hogwarts.json';
import Explanation from './Explanation';

export default function CharacterSelection() {
    console.log(myData.characters[0].img);
    return (
        <ul className="menu " >
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
            ))
            };
            
        </ul>
    )

    /*
    <ul className="menu " >
    
    <li>
    
    <a className="card-title" href='http://localhost:3000/character/Harry'>
        <img src={Harry} ></img>
        Harry Potter
    
    </a>
    
    
    
    </li>
    <li>
    <a className="card-title" href='http://localhost:3000/character/Hermione'>
        <img src={Hermione} ></img>
        Hermione Granger
    </a>
    </li>
    <li>
    <a className="card-title" href='http://localhost:3000/character/Ron'>
        <img src={Ron} ></img>
        Ron Weasley
    </a>
    </li>
    
    </ul>
    */
}





