import React, { useEffect, useState } from 'react';

export default function Flashlight() {
  let hasTorch = false;
  const [torchOn, settorchOn] = useState(false);
  let track = null;

  const toggleTorch = () => {
    if (!hasTorch || !track) return;
    track.applyConstraints({
      advanced: [{ torch: !torchOn }],
    });
  };
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: 'environment',
        },
      })
      .then((stream) => {
        const video = document.querySelector('video');
        if (!video) {
          console.error("Couldn't find video element");
          return;
        }
        video.srcObject = stream;
        track = stream.getVideoTracks()[0];
        video.addEventListener('loadedmetadata', (e) => {
          window.setTimeout(() => onCapabilitiesReady(track.getCapabilities()), 500);
        });

        function onCapabilitiesReady(capabilities) {
          console.log(capabilities);
          if (capabilities.torch) {
            hasTorch = true;
          } else {
            console.log('No torch capability');
          }
        }
      })
      .catch((err) => console.error('getUserMedia() failed: ', err));
  }, []);

  const hidden = {
    display: 'none',
  };

  return (
    <>
      <button className="btn btn-primary" onClick={toggle}>
        Flash {torchOn ? 'off' : 'on'}
      </button>
      <video autoPlay style={hidden}></video>
    </>
  );
}
