import React from 'react';
import classNames from 'classnames';

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
    upcoming: 'bg-white',
    current: 'bg-primary',
    done: 'bg-accent text-white',
  };

  return (
    <div className={classNames('flex flex-row m-4', { 'justify-end': right, 'justify-start': !right })}>
      <div className={classNames(`flex p-2 rounded ${color[state]}`, { 'flex-row-reverse': right })}>
        <div className="avatar">
          <div className="w-16 h-16 rounded-full">
            <img src={avatar} />
          </div>
        </div>
        <div className="flex p-2 flex-col">
          <div className="flex flex-row">
            <span className="text-lg font-bold opacity-100">{character}</span>
            <span className="ml-1 text-lg italic opacity-60">({emotion})</span>
          </div>
          <span className="text-s opacity-100 ">{text}</span>
        </div>
      </div>
    </div>
  );
}
