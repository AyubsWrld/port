import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import './Animation.css';
import animationData from '../assets/anims/Intro.json';

export default function Animation({ width = '600px', height = 'auto', loop = false, onComplete }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 4500); // Adjust fade duration as needed

    return () => clearTimeout(fadeTimer);
  }, []);

  const handleAnimationComplete = () => {
    // Call the onComplete callback when the animation is done
    if (onComplete) onComplete();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'  , mixBlendMode: 'screen'}}>
      <Lottie
        animationData={animationData}
        loop={false}
        style={{ width: width, height: height }}
        className={fade ? 'fade-out' : ''}
        onComplete={handleAnimationComplete}
      />
    </div>
  );
}
