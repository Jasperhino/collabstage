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
    upcoming: 'bg-white',
    current: 'bg-primary',
    done: 'bg-gray-800',
  };

  return (
    <ul className="menu rounded-box">
      <li>
        {!right ? (
          <div className={`flex m-4  place-items-start ${color[state]}`}>
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={avatar} />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <span className="text-lg font-bold opacity-100">{character}</span>
                <span className="ml-1 text-lg italic opacity-60">({emotion})</span>
              </div>

              <span className="text-s opacity-100 ">{text}</span>
            </div>
          </div>
        ) : (
          <div className={`flex m-4  place-items-start ${color[state]}`}>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <span className="text-lg  font-semibold opacity-100">{character}</span>
                <span className="text-lg font-bold text-red-900 opacity-60 ">({emotion})</span>
              </div>

              <span className="text-s opacity-100 ">{text}</span>
            </div>
            <div className="avatar" style={{ paddingLeft: '5%' }}>
              <div className="w-24 rounded-full">
                <img src={avatar} />
              </div>
            </div>
          </div>
        )}
      </li>
    </ul>
  );
}
