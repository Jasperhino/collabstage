import React, { ReactNode } from 'react';

export default function HeroLayout(props: { children: ReactNode }) {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">{props.children}</div>
        </div>
      </div>
    </>
  );
}
