import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect } from 'react';
import socketService from '../../services/socketService';
import { useNavigate, useParams } from 'react-router-dom';
import { IActorJoinedMessage, ISpellMessage, IStageState } from '@server/types';
import { IPlay , IStep } from '@server/types/play';
import { ChatBubble } from 'daisyui';
import { stepDone } from 'src/services/stageService';




interface ITeleprompterProps {
    step: IPlay;
}

interface ISharedDialogProps {
    step: IStep;
  }
export default function Teleprompter( { step }: ISharedDialogProps){
//export default function Teleprompter({ step }: ITeleprompterProps) {
    const backdrop = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/backgrounds/hogwarts.jpg')`,
    };

    const [currentMessage, setCurrentMessage] = useState(0);

    useEffect(() => {
        // Get a reference to the table element.
        const tableElement = document.getElementById("table");
        if (tableElement && tableElement.lastChild) {
            const lastRow = tableElement.lastChild as HTMLTableRowElement;
            lastRow.scrollIntoView();
        }
    }, [currentMessage]);

    function handleButton() {
        stepDone(step.character);
    }

    return (
        <div className="flex-col w-screen h-screen items-center bg-opacity-50 -z-100 overflow-auto " style={backdrop}>
                <div className="card card-side bg-base-100 shadow-xl mt-4 lg:flex-row-reverse shrink-0">                    
                    {step.character != "Harry" ? <figure><img src={step.avatar} className="rounded-full w-24" /></figure> : ""}
                    <div className="card-body">
                        <h2 className="card-title">{step.character}</h2>
                        <p>{step.text}</p>
                        <div className="card-actions justify-end">
                            <div className="text-xs2 opacity-100"><p>{"("}{step.emotion}{")"}</p></div>
                        </div>
                    </div>
                    {step.character == "Harry" ? <figure><img src={step.avatar} className="rounded-full w-24" /></figure> : ""}
                </div>
            <button onClick={handleButton} className="btn btn-primary">
                Next
            </button>
        </div>



    );





    /*
    <div className="flex-col w-screen h-screen items-center bg-opacity-50 -z-100 overflow-auto" style={backdrop}>
                {myData.script.slice(0, currentMessage).map((line, i) => (
                    <div
                        className={line.character === "Harry" ? "chat chat-end" : "chat chat-start"}
                    >

                        <div className="chat-bubble chat-bubble-primary mt-4">
                            <div className="chat-header">
                                <div className="text-xs opacity-100"><p>{"("}{line.line.emotions}{")"}</p></div>
                            </div>
                            <div className="chat-image avatar">
                                {line.character === "Harry" ? line.line.lines : ""}

                                <div className="w-20 rounded-full">
                                    <img src={line.characterImage} />
                                </div>
                                {line.character === "Harry" ? "" : line.line.lines}

                            </div>
                        </div>
                    </div>
                ))
                };
                <button onClick={handleButton} className="btn btn-primary">
                    Next
                </button>
            </div>
            );
            */
} 