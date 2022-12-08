import React from 'react';
import { useSound } from 'use-sound';

// Define the sound files that we want to use
import sound1 from './sounds/sound1.mp3';
import sound2 from './sounds/sound2.mp3';

// Create a function that will be called when the user performs a specific action
function handleClick() {
  // Use the useSound hook to play the first sound
  useSound(sound1);

  // After a brief delay, play the second sound
  setTimeout(() => {
    useSound(sound2);
  }, 500);
}

// Render a button that will trigger the soundscape when clicked
const App = () => {
  return (
    <button onClick={handleClick}>
      Click me to trigger the soundscape!
    </button>
  );
}
export default App;
