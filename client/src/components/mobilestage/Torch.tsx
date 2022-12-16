import React, { useEffect, useState } from 'react';

export default function Torch({ torchOn }: { torchOn: boolean }) {
  const [hasTorch, setHasTorch] = useState(false);
  const [track, setTrack] = useState<MediaStreamTrack | null>(null);

  useEffect(() => {
    if (!track || !hasTorch) return;
    track.applyConstraints({
      advanced: [{ torch: torchOn }],
    });
  }, [torchOn]);

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('getUserMedia() not supported.');
      return;
    }
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
        setTrack(stream.getVideoTracks()[0]);

        video.addEventListener('loadedmetadata', (e) => {
          window.setTimeout(() => onCapabilitiesReady(track.getCapabilities()), 1500);
        });

        function onCapabilitiesReady(capabilities) {
          console.log(capabilities);
          if (capabilities.torch) {
            console.log('Found torch!');
            setHasTorch(true);
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

  return <video autoPlay style={hidden}></video>;
}
