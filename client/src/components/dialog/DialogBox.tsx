import { atom, useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import socketService from '../../services/socketService';
import stageService from '../../services/stageService';
import CharacterLayout from '../dialog/CharacterLayout';

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


    let lines: string[] = ['Vamos embora fdsjfsdfsfsfsfhdsfsidfisdifhsdifhsifhdsif', 'nao', 'anda la'];
    let character: string[] = ['Harry', 'Hermione', 'Ron'];
    let character_images: string[] = ['https://images6.alphacoders.com/691/691559.jpg', 'https://wallpaper.dog/large/201223.jpg', 'https://images6.alphacoders.com/691/thumb-1920-691561.jpg'];

    const [currentMessage, setCurrentMessage] = useState(0);
    const handleButton = () => {
        if (currentMessage < lines.length - 1) {
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
                    <img src={character_images[currentMessage]} className="max-w-sm rounded-lg shadow-2xl" />
                    <div className="DialogWindow">
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{character[currentMessage]}</h2>
                                <p>{lines[currentMessage]}</p>
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

//harry: line
//new class
//String name; String line;

//

