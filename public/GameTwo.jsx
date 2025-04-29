import React, { useState, useContext, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import BezierEasing from 'bezier-easing';

export default function GameTwo(props) {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [error, setError] = useState(null);

  const modelPath = getModelPath('CardtrigeTwo.glb');
  
  const { scene } = useGLTF(modelPath, true, (loader) => {
    loader.crossOrigin = 'anonymous';
  });

  useEffect(() => {
    if (scene) {
      setModelLoaded(true);
    }
  }, [scene]);

  const { position, rotation } = useSpring({
    from: { position: [-10, 4, -0.5], rotation: [-0.8, 4, -0.3] },
    to: { 
      position: props.coordinates || [-10, 4, -0.5],
      rotation: props.rotationalCoordinates || [-0.8, 4, -0.3]
    },
    config: {
      duration: 2000,
      easing: t => easing(t)
    }
  });

  if (!modelLoaded) return null;

  return (
    <animated.primitive
      object={scene}
      position={position}
      rotation={rotation}
      {...props}
    />
  );
}

try {
  useGLTF.preload(getModelPath('CartridgeTwo.glb'));
} catch (error) {
  console.error('Error preloading models:', error);
}
