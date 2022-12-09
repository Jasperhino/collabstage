import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect } from 'react';
import socketService from '../../services/socketService';
import { useNavigate, useParams } from 'react-router-dom';
import { IActorJoinedMessage, ISpellMessage, IStageState } from '@server/types';
import myData from '../dialog/hogwarts.json';


interface IToast {
    message: string;
}

export default function Teleprompter() {




    const backdrop = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/backgrounds/hogwarts.jpg')`,
    };

    const [currentMessage, setCurrentMessage] = useState(0);
    const handleButton = () => {
        if (currentMessage < myData.size - 1) {
            setCurrentMessage(currentMessage + 1);
        } else {
            setCurrentMessage(0);
        }
        console.log("button");
    };

    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Name</th>
                        <th>Line</th>
                        <th>Emotion</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {myData.script.slice(0, currentMessage).map((line, i) => (
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={line.characterImage} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{line.character}</div>
                                        <div className="text-sm opacity-50">Username</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {line.line.lines}
                                <br />
                                <span className="badge badge-ghost badge-sm">something</span>
                            </td>
                            <td>{line.line.emotions}</td>
                            
                        </tr>
                    ))};
                    <button onClick={handleButton} className="btn btn-primary">Next</button>

                </tbody>
            </table>
        </div >

    );












/*
        <div className="flex w-screen h-screen items-center bg-opacity-50 -z-100 overflow-auto" style={backdrop}>
            <table className="table-auto">
                <tbody>
                    <div className="flex flex-line justify-center mx-32">
                        {myData.script.slice(0, currentMessage).map((line, i) => (
                            <tr>
                                <div className="hero min-h-screen bg-base-200">
                                    <div className="hero-content flex-col lg:flex-row">
                                        <img src={line.characterImage} className="max-w-sm rounded-lg shadow-2xl" />
                                        <div>
                                            <h1 className="text-5xl font-bold">{line.character}</h1>
                                            <p className="py-6">{line.line.lines}</p>
                                            <p className="py-6">{line.line.emotions}</p>
                                        </div>
                                    </div>
                                </div>
                            </tr>

                        ))};
                        <button onClick={handleButton} className="btn btn-primary">Next</button>

                    </div>
                </tbody>

            </table >
        </div>


    );
    */
}
