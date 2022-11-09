import React, { useState } from 'react';
import HeroLayout from '../layout/HeroLayout';
import AuthCode from 'react-auth-code-input';
import { QrReader } from 'react-qr-reader';

export default function FindStage() {
  const [stageId, setStageId] = useState<string>('');

  const handleScan = (stageId: string) => {
    if (data) {
    }
  };

  return (
    <HeroLayout>
      <p>Scan the QR-code or enter the code displayed on the shared stage to join the Game</p>
      <AuthCode
        length={4}
        allowedCharacters="alpha"
        inputClassName="input w-10 h-10 max-w-10 p-2 m-2 text-2xl text-center border border-gray-300 rounded-md flex"
        containerClassName="max-w-full flex justify-center"
        onChange={setStageId}
      />

      <QrReader
        onResult={(result, error) => {
          if (error) {
            console.info(error);
          }
          if (!result) return;
          const text = result?.text;
          if (!text) return;

          if (text.length === 4 && text.test(/^[a-zA-Z]+$/)) {
            setStageId(text);
          } else {
            const match = text.match(/stage\/join\/([a-zA-Z]+)/);
            if (match) {
              setStageId(match[1]);
            }
          }
        }}
        constraints={{ facingMode: { ideal: 'environment' } }}
      />
      <p>{stageId}</p>
    </HeroLayout>
  );
}
