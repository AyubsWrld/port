import React, { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import BezierEasing from 'bezier-easing'; // Import bezier-easing library

const easing = BezierEasing(0.125, 0.545, 0.070, 0.910);

export default function Cartridge({ polarCoordinates = [[-0.2, -0.2, 0], [-4, -0.2, 0]], onClick, ...props }) {
  const { scene } = useGLTF('./Test.glb'); // Adjust path if needed

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handlePointerOver = () => {
    setHovered(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  const handleClick = () => {
    setClicked(prevClicked => !prevClicked);
    if (onClick) {
      onClick(); // Notify parent component of the click
    }
  };

  const { position, rotation } = useSpring({
    from: { position: [-0.2, -4, 0], rotation: [-0.8, 1, -0.3] },
    to: {
      position: clicked ? polarCoordinates[0] : polarCoordinates[1],
      rotation: hovered ? [-0.5, 0.2, 0.3] : [-0.5, 0.3, 0.3]
    },
    config: {
      duration: 3000,
      easing: t => easing(t)
    }
  });

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

useGLTF.preload('./Test.glb'); // Preload GLTF model
