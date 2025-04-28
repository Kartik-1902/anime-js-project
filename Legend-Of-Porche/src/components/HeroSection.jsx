import React, { use, useEffect, useRef } from 'react';
import { animate, createScope, createTimeline } from 'animejs';

export default function HeroSection() {
  const rootRef = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ rootRef }).add(self => {
        createTimeline().label('start').add('.porsche-text', {left: '-85vw', top:'-90vh'}, 500);
        return () => scope.current.revert();
    });
  }, []);

  return (
    <div ref={rootRef} className="hero relative h-screen overflow-hidden">
      <div
        className="hero-image absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/porsche-targa-1621744_1920.jpg')` }}
      />
      <div className="hero-overlay opacity-0 absolute inset-0 bg-black z-10" />
      <h1
        className="porsche-text text-meaculpa absolute inset-0 flex items-center justify-center text-white text-6xl z-20"
      >
        Porsche
      </h1>
    </div>
  );
}