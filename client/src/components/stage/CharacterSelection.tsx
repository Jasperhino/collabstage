import React, { useState } from 'react';
import { IStageOptions } from '@server/types';
import { atom, useAtom } from 'jotai';

import { useNavigate } from 'react-router-dom';
import socketService from '../../services/socketService';
import stageService from '../../services/stageService';
import Home from '../home/Home';
import Harry from '../../../public/characters.png';
import Hermione from '../../../public/character2.png';
import Ron from '../../../public/character3.png';


export default function CharacterSelection() {

    return (

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



    );

}