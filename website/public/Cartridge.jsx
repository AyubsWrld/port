import React, { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import BezierEasing from 'bezier-easing'; // Import bezier-easing library

// Create a Bezier easing function
const easing = BezierEasing(0.125, 0.545, 0.070, 0.910);

export default function Cartridge(props) {
  const { scene } = useGLTF('./Test.glb'); // Adjust path if needed

  const [hovered, setHovered] = useState(false);

  const handlePointerOver = () => {
    setHovered(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  const { position, rotation } = useSpring({
    from: { position: [0, -4, 0], rotation: [-0.8, 1, -0.3] },
    to: {
      position: hovered ? [0.2, -0.2, 0] : [0.2, -0.2, 0],
      rotation: hovered ? [-0.5, 0.2, 0.3] : [-0.5, 0.3, 0.3]
    },
    config: {
      duration: 3000,
      easing: t => easing(t) // Apply custom cubic Bezier easing
    }
  });

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

useGLTF.preload('./Test.glb'); // Adjust path if needed

