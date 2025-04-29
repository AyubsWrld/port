import React, { useState, useContext, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import BezierEasing from 'bezier-easing';

const easing = BezierEasing(0.125, 0.545, 0.070, 0.910);

// Utility function to get the correct path
const getModelPath = (modelName) => {
  return import.meta.env.BASE_URL + modelName;
};

export default function Game(props) {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [error, setError] = useState(null);

  const modelPath = getModelPath('Cartridge.glb');
  
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
  useGLTF.preload(getModelPath('Cartridge.glb'));
} catch (error) {
  console.error('Error preloading models:', error);
}
