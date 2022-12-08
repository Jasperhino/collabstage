import React, { useState } from 'react';
import { IStageOptions } from '@server/types';
import { atom, useAtom } from 'jotai';

import { useLocation, useNavigate } from 'react-router-dom';
import socketService from '../../services/socketService';
import stageService from '../../services/stageService';
import Harry from '../../../public/characters.png';
import back from '../stage/CharacterSelection';

export interface Character {
    name: string;
    avatar: string;
    description: string;
    img: string,
    age: number;
}

export default function Explanation() {

    const handleClick = (event: { currentTarget: { disabled: boolean; }; }) => {
        event.currentTarget.disabled = true;
        //console.log('button clicked');
    };

    const character = JSON.parse(useLocation().state.character) as Character
    console.log(character.img);
    
    return (
        <div className="card ">
            
            <figure><img src={character.img} alt="Harry Potter" /></figure>
            <div className="card-body">
                <h2 className="card-title m-auto">{character.name}</h2>
                <p>{character.description}</p>

                <div className="card-actions justify-end" >
                    <a href="./">
                        <button className="btn btn-primary">Back</button>
                    </a>


                    <button onClick={handleClick} className="btn btn-primary">Choose</button>



                </div>
            </div>
        </div>

    );


}