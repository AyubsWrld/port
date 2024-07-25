import React, { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import BezierEasing from 'bezier-easing';

const easing = BezierEasing(0.125, 0.545, 0.070, 0.910);

export default function Game(props) {
  const { scene } = useGLTF('./Cartridge.glb'); 

  // State to trigger the animation on hover
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Define the spring animation for position and rotation with easing
  const { position, rotation } = useSpring({
    from: { position: [-10, 4, -0.5], rotation: [-0.8, 4, -0.3] },
    to: { 
      position: clicked ? [-0.4 , 3.5, -0.3] : [-0.4, 3.5, -0.3],
      rotation: hovered ? [-0.5, 0.14, 0.3] : [-0.5, 0.3, 0.3]
    },
    config: {
      duration: 3000,
      easing: t => easing(t)
    }
  });

  // Event handlers for hover events
  const handlePointerOver = () => {
    setHovered(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  const handleClick = () => {
    setClicked(prev => !prev);
  };

  return (
    <animated.primitive
      object={scene}
      position={position}
      rotation={rotation}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
      {...props}
    />
  );
}

useGLTF.preload('./Cartridge.glb'); // Ensure the path is correct
