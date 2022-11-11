import React, { useEffect } from 'react';
import { Accelerometer } from 'motion-sensors-polyfill/src/motion-sensors.js';

export default function Sensor() {
  useEffect(() => {
    let accelerometer = null;
    try {
      accelerometer = new Accelerometer({ frequency: 60 });
      accelerometer.onerror = (event) => {
        // Handle runtime errors.
        if (event.error.name === 'NotAllowedError') {
          console.log('Permission to access sensor was denied.');
        } else if (event.error.name === 'NotReadableError') {
          console.log('Cannot connect to the sensor.');
        }
      };
      accelerometer.onreading = (e) => {
        console.log(`x: ${e.target.x} y: ${e.target.y} z: ${e.target.z}`);
      };
      accelerometer.start();
    } catch (error: any) {
      // Handle construction errors.
      if (error.name === 'SecurityError') {
        console.log('Sensor construction was blocked by the Permissions Policy.');
      } else if (error.name === 'ReferenceError') {
        console.log('Sensor is not supported by the User Agent.');
      } else {
        throw error;
      }
    }
      
    let gyroscope = null;
    try {
        accelerometer = new Gyroscope(device' });
        accelerometer.addEventListener('error', (event) => {
            // Handle runtime errors.
            if (event.error.name === 'NotAllowedError') {
                // Branch to code for requesting permission.
            } else if (event.error.name === 'NotReadableError' ) {
                console.log('Cannot connect to the sensor.');
            }
        });
        accelerometer.addEventListener('reading', () => reloadOnShake(accelerometer));
        accelerometer.start();
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
