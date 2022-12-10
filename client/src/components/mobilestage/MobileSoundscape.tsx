import React from 'react';
import { useSound } from 'use-sound';

// Define the sound files that we want to use
import sound1 from '../sounds/sound1.mp3';
import sound2 from '../sounds/sound2.mp3';


export default function Soundscape() {
    // Create a function that will be called when the user performs a specific action
    
    const [play] = useSound(sound1);
      
     
    function handleClick() {
        // Use the useSound hook to play the first sound
        play();
    }
    return (
        <button onClick={handleClick}>
            Click me to trigger the soundscape!
        </button>
    );
}
