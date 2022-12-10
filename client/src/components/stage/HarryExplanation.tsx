import React, { useState } from 'react';
import { IStageOptions } from '@server/types';
import { atom, useAtom } from 'jotai';

import { useNavigate } from 'react-router-dom';
import socketService from '../../services/socketService';
import stageService from '../../services/stageService';
import Harry from '../../../public/characters.png';
import back from '../mobilestage/MobileCharacterSelection';


export default function HarryExplanation() {
    
    const handleClick = (event: { currentTarget: { disabled: boolean; }; }) => {
        event.currentTarget.disabled = true;
        //console.log('button clicked');
    };

    return (
             
        <div className="card ">
        <figure><img src={Harry} alt="Harry Potter" /></figure>
        <div className="card-body">
            <h2 className="card-title m-auto">Harry Potter</h2>
            <p>Harry is an orphan living with his abusive aunt and uncle, Vernon and Petunia Dursley and their bullying son, Dudley. On his eleventh birthday, Harry discovers he is a wizard when Rubeus Hagrid delivers him an acceptance letter to Hogwarts School of Witchcraft and Wizardry.</p>

            <div className="card-actions justify-end" >
                <a href='http://localhost:3000/character'>
                    <button className="btn btn-primary">Back</button>
                </a>
                
                    
                    <button onClick={handleClick} className="btn btn-primary">Choose</button>
                    
                

                

            </div>
        </div>
    </div>
            
    );

    
}