import { IStep } from '@server/types/play';
import React from 'react';

interface IMobileDialogMessageProps {
  character: string;
  avatar: string;
  text: string;
  emotion: string;
  right: boolean;
  state: 'upcoming' | 'current' | 'done';
}

export default function MobileDialogMessage({
  character,
  avatar,
  text,
  emotion,
  right,
  state,
}: IMobileDialogMessageProps) {
  const color = {
    upcoming: 'chat-bubble-accent',
    current: 'chat-bubble-secondary',
    done: 'chat-bubble-primary',
  };

  return (
    <div className={`chat ${right ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={avatar} />
        </div>
      </div>
      <div className="chat-header">
        {character}
        <p className="text-xs opacity-50">{emotion}</p>
      </div>
      <div className={`chat-bubble ${color[state]}`}>{text}</div>
    </div>
  );
}
