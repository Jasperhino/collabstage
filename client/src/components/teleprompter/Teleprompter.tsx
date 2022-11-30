import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect } from 'react';
import socketService from '../../services/socketService';
import { useNavigate, useParams } from 'react-router-dom';
import { IActorJoinedMessage, ISpellMessage, IStageState } from '@server/types';
import ActorList from './dialogList';
import Feather from '../stage/Feather';
import myData from '../dialog/hogwarts.json';


interface IToast {
    message: string;
}

export default function SharedStage() {
    const navigate = useNavigate();
    const { stageId } = useParams();
    const [toasts, updateToasts] = useState<IToast[]>([]);
    const [state, setState] = useState<IStageState | null>(null);
    const [flying, setFlying] = useState<boolean>(false);

    const vengadiumLeviosa = () => {
        if (flying) {
            return;
        }
        setFlying(true);
        setTimeout(() => {
            setFlying(false);
        }, 1000 * 10);
    };

    useEffect(() => {
        const socket = socketService.socket;
        if (!socket) {
            console.error('No socket');
            //navigate('/');
            return;
        }
        if (!stageId) {
            console.error('No stageId');
            return;
        }
        socket.on('actor_joined', (message: IActorJoinedMessage) => {
            console.log(`${message.actorName} joined the Stage `);
            updateToasts((toasts) => [...toasts, { message: `${message.actorName} joined` }]);
        });

        socket.on('stage_update', (state) => {
            console.log('Stage: ', state);
            setState(state);
        });

        socket.on('cast_spell', (spell: ISpellMessage) => {
            vengadiumLeviosa();
        });
    }, []);

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

                        {myData.script.slice(0, currentMessage).map((actor, i) => (
                            <tr>
                                <div className="hero min-h-screen bg-base-200">
                                    <div className="hero-content flex-col lg:flex-row">
                                        <img src={actor.characterImage} className="max-w-sm rounded-lg shadow-2xl" />
                                        <div>
                                            <h1 className="text-5xl font-bold">{actor.character}</h1>
                                            <p className="py-6">{actor.line.lines}</p>
                                            <p className="py-6">{actor.line.emotions}</p>
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
