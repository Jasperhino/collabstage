import React from 'react';

export function Vibration() {
  const vibrate = () => {
    navigator.vibrate(1000);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={vibrate}>
        Vibrate!
      </button>
    </>
  );
}
