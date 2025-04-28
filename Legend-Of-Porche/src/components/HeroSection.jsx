import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

export default function HeroSection() {
  const rootRef = useRef(null);

  useEffect(() => {
    // Log to verify elements exist
    console.log('Overlay exists:', !!rootRef.current.querySelector('.hero-overlay'));
    console.log('Text exists:', !!rootRef.current.querySelector('.porsche-text'));

    // Create Anime.js timeline
    const tl = anime.timeline({
      easing: 'easeOutQuad',
      autoplay: true, // Auto-play the timeline
    });

    // Add animations to timeline
    tl
      .add({
        targets: '.hero-overlay',
        opacity: [1, 0],
        duration: 800,
      }, 0)
      .add({
        targets: '.porsche-text',
        opacity: [0, 1],
        scale: [0.5, 1],
        duration: 1000,
        easing: 'easeInOutSine',
      }, 200)
      .add({
        targets: '.porsche-text',
        translateX: ['0%', '-50vw'],
        translateY: ['0%', '-50vh'],
        duration: 1000,
        easing: 'easeInOutQuad',
      }, '+=200')
      .add({
        targets: '.hero-image',
        opacity: [0, 1],
        duration: 1200,
        easing: 'linear',
      }, '-=1200'); // Overlap with previous animation

    // Cleanup: Remove animations on unmount
    return () => {
      anime.remove('.hero-overlay, .porsche-text, .hero-image');
    };
  }, []);

  return (
    <div ref={rootRef} className="hero relative h-screen overflow-hidden">
      <div
        className="hero-image absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/porsche-targa-1621744_1920.jpg')` }}
      />
      <div className="hero-overlay absolute inset-0 bg-black z-10" />
      <h1
        className="porsche-text absolute inset-0 flex items-center justify-center text-white text-6xl z-20"
      >
        Porsche
      </h1>
    </div>
  );
}