import React, { useState } from 'react';
import HeroLayout from '../layout/HeroLayout';
import AuthCode from 'react-auth-code-input';
import QrReader from 'react-qr-reader-es6';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';

export default function FindStage() {
  const navigate = useNavigate();

  const handleInputUpdate = (update: string) => {
    console.log(update);
    if (update.length === 4 && update.match(/^[a-zA-Z]+$/)) {
      navigate(`/stage/${update.toUpperCase()}/join`, { replace: true });
    }
  };

  return (
    <>
      <Navbar />
      <HeroLayout>
        <p>Scan the QR-code or enter the code displayed on the shared stage to join the Game</p>
        <AuthCode
          length={4}
          allowedCharacters="alpha"
          inputClassName="input w-10 h-10 max-w-10 p-2 m-2 text-2xl text-center border border-gray-300 rounded-md flex uppercase"
          containerClassName="max-w-full flex justify-center"
          onChange={handleInputUpdate}
        />

        <QrReader
          onScan={(text) => {
            if (!text) return;
            console.log('qr reader', text);
            if (text.length === 4 && text.match(/^[a-zA-Z]+$/)) {
              handleInputUpdate(text);
            } else {
              const match = text.match(/stage\/([a-zA-Z]+)/);
              if (match) {
                handleInputUpdate(match[1]);
              }
            }
          }}
          onError={(error) => {
            console.info(error);
          }}
        />
      </HeroLayout>
    </>
  );
}
