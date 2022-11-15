import React, { useEffect } from 'react';
import { Accelerometer, Gyroscope } from 'motion-sensors-polyfill/src/motion-sensors.js';

export default function Sensor() {
  useEffect(() => {
    let gyroscope = null;
    try {
      gyroscope = new Gyroscope({ frequency: 60 });
      gyroscope.addEventListener('error', (event) => {
        // Handle runtime errors.
        if (event.error.name === 'NotAllowedError') {
          // Branch to code for requesting permission.
        } else if (event.error.name === 'NotReadableError') {
          console.log('Cannot connect to the sensor.');
        }
      });
      gyroscope.onreading = (e) => {
        console.log(`x: ${e.target.x} y: ${e.target.y} z: ${e.target.z}`);
      };
      gyroscope.start();
    } catch (error) {
      // Handle construction errors.
      if (error.name === 'SecurityError') {
        // See the note above about feature policy.
        console.log('Sensor construction was blocked by a feature policy.');
      } else if (error.name === 'ReferenceError') {
        console.log('Sensor is not supported by the User Agent.');
      } else {
        throw error;
      }
    }
  });

  return <div>Sensor</div>;
}
