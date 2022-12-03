import React from 'react';
import { IStageOptions } from '@server/types';
import { atom, useAtom } from 'jotai';

import { useNavigate } from 'react-router-dom';
import socketService from '../../services/socketService';
import stageService from '../../services/stageService';
import Ron from '../../../public/character3.png';


export default function HarryExplanation() {
    return (
        
                    <div className="card">
                        <figure><img src={Ron} alt="Ron Weasley" /></figure>
                        <div className="card-body">
                            <h2 className="card-title m-auto">Ron Weasley</h2>
                            <p>One of the protagonists in the novel, Ron Weasley is one of Harry's best friends, along with Hermione Granger. Ron is the youngest son in the Weasley family, and he has five older brothers. Ron feels that he is constantly outshone by their accomplishments, and his deepest desire is to achieve more than any of them.</p>

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