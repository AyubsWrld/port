import React, { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import BezierEasing from 'bezier-easing';

const easing = BezierEasing(0.125, 0.545, 0.070, 0.910);

export default function GameTwo(props) {
  const { scene } = useGLTF('./CardtrigeTwo.glb'); 

  // State to trigger the animation on hover
  const [hovered, setHovered] = useState(false);

  // Define the spring animation for position and rotation with easing
  const { position, rotation } = useSpring({
    from: { position: [-10, 3.6, -0.5], rotation: [-0.8, 4, -0.3] },
    to: { position: [-3.8, 3.6, -0.5], rotation: hovered ? [0, -0.1, 0] : [-0.5, 0.3, 0.3] },
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

  return (
    <animated.primitive
      object={scene}
      position={position}
      rotation={rotation}
      onPointerOver={handlePointerOver} // Add hover event handler
      onPointerOut={handlePointerOut}   // Add hover event handler
      {...props}
    />
  );
}

useGLTF.preload('./CardtrigeTwo'); // Adjust path if needed
