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
}
