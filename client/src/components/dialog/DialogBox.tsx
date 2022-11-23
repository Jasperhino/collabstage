import { atom, useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import socketService from '../../services/socketService';
import stageService from '../../services/stageService';
import CharacterLayout from '../dialog/CharacterLayout';
import myData from '../dialog/hogwarts.json';

const socketAtom = atom<Socket | null>(null);

export default function DialogBox() {
    const [socket, setSocket] = useAtom(socketAtom);
    useEffect(() => {
        const socket = socketService.socket;
        setSocket(socket);
        if (!socket) {
            console.warn('No socket');
            return;
        }
    }, []);
    var count: number = 1;

    const backdrop = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/backgrounds/hogwarts.jpg')`,
    };


    function populateArray(){
    }

    const [currentMessage, setCurrentMessage] = useState(0);
    const handleButton = () => {
        //I have to fix this, im cheating
        if (currentMessage < myData.size - 1) {
            setCurrentMessage(currentMessage + 1);
        } else {
            setCurrentMessage(0);
        }

        console.log("button");
    };
    
    //https://blenderartists.org/t/hogwarts-classroom/1215909
    return (
        <div className="flex w-screen h-screen items-center bg-opacity-50 -z-100 overflow-auto" style={backdrop}>
            <div className="hero min-h-screen   bg-opacity-0 -z-100 bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={myData.script[currentMessage].characterImage} className="max-w-sm rounded-lg shadow-2xl" />
                    <div className="DialogWindow">
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{myData.script[currentMessage].character}</h2>
                                <p>{myData.script[currentMessage].line.lines[0]}</p>
                                <div className="card-actions justify-end">
                                    <button onClick={handleButton} className="btn btn-primary">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


