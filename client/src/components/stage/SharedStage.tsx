import React from 'react';
import HeroLayout from '../layout/HeroLayout';

export default function SharedStage() {
  return (
    <HeroLayout>
      <h3>SharedStage</h3>
      <p>This is where you should be able to see people join a stage.</p>
      {/*isInStage && <p>But you are in stage already in a stage.</p>*/}
    </HeroLayout>
  );
}
