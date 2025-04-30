import React, { use, useEffect, useRef } from 'react';
import { animate, createScope, createTimeline,createAnimatable } from 'animejs';

export default function HeroSection() {
  const rootRef = useRef(null);
  const scope = useRef(null);

	useEffect(() => {
		const cursor = document.getElementById('custom-cursor');
		const porscheText = document.getElementById('porsche-text');
		
		const moveCursor = (e) => {
			const { clientX, clientY } = e;
			cursor.style.transform = `translate(${clientX}px, ${clientY}px) translate(-60%, -60%)`;
		};
		

    window.addEventListener('mousemove', moveCursor);
		
		scope.current = createScope({ rootRef }).add(self => {
			
			// Pulse Animation (independent)
			const pulse = animate('.porsche-text', {
				color: ['#ffffff', '#7f7e85', '#ffffff', '#7f7e85', '#ffffff'],
				direction: 'alternate',
				ease: 'InOutQuad',
				duration: 4000,
			});
			animate('.scroll-circle', {
				translateY: [0, 40, 0],
				opacity: [1, 0.4, 1],
				easing: 'easeInOutSine',
				duration: 1500,
				loop: true,
			}, '-=5000');

			// Fade overlay and move logo together
			const transitionTimeline = createTimeline({ autoplay: false })
				.add('.hero-overlay', {
					opacity: 0,
					duration: 1000,
					easing: 'easeOutQuad',
				}, 0) 
				.add('.porsche-text', {
					top: '4vh',
					left: '6vw',
					scale: 0.5,
					duration: 1000,
					easing: 'easeOutQuad',
				}, 0); // both happen together
	
			// Master Timeline
			const mainTimeline = createTimeline()
				.sync(pulse)
				.sync(transitionTimeline, '+=0'); // start transition *immediately* after pulse ends
	
			return () => {scope.current.revert(),
				window.removeEventListener('mousemove', moveCursor);
			};
		});
	}, []);


  return (
    <div ref={rootRef} className="hero relative h-screen overflow-hidden">
			<div  className="hero-image absolute inset-0 bg-cover bg-center z-0"
      style={{ backgroundImage: `url('/porsche-targa-1621744_1920.jpg')` }}/>
      <div className="hero-overlay absolute inset-0 bg-black z-10" />
      <h1
        className="porsche-text font-orbitron absolute mt-[0.2rem]  ml-[0.2rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl z-20"
      >
        Porsche
      </h1>
			<div className="scroll-indicator absolute mt-[0.2rem]  ml-[0.2rem] top-[95%] left-1/2 -translate-x-1/2 -translate-y-1/22">
				<div class="scroll-circle  absolute  w-4 h-4 rounded-full bg-[#f68548]"></div>
			</div>
		  <div id="custom-cursor" className="pointer-events-none fixed top-0 left-0 w-8 h-8 border-2 border-[#f68548] rounded-full transform -translate-x-1/2 -translate-y-1/2 z-50"></div>
    </div>
  );
}