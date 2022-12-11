import React from 'react';
import { IStageOptions } from '@server/types';
import { atom, useAtom } from 'jotai';

import { useNavigate } from 'react-router-dom';
import socketService from '../../services/socketService';
import stageService from '../../services/stageService';
import Hermione from '../../../public/character2.png';


export default function HarryExplanation() {
    return (
       
                    <div className="card ">
                        <figure><img src={Hermione} alt="Harry Potter" /></figure>
                        <div className="card-body">
                            <h2 className="card-title m-auto">Hermione Granger</h2>
                            <p>Minister Hermione Jean Granger (b. 19 September 1979) was an English Muggle-born witch born to Mr and Mrs Granger. At the age of eleven, she learned about her magical nature and was accepted into Hogwarts School of Witchcraft and Wizardry. Hermione began attending Hogwarts in 1991 and was Sorted into Gryffindor House.</p>

                            <div className="card-actions justify-end" >
                                <a href='http://localhost:3000/character'>
                                    <button className="btn btn-primary" >Back</button>
                                </a>

                                <button className="btn btn-primary">Choose</button>
                            </div>
                        </div>
                    </div>
             
    )
}