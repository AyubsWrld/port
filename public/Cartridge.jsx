import React, { useState, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import BezierEasing from 'bezier-easing';
import Animation from '../src/assets/anims/Flipped.mp4';

const easing = BezierEasing(0.125, 0.545, 0.070, 0.910);

const getModelPath = (modelName) => {
  return import.meta.env.BASE_URL + modelName;
};

export default function Cartridge({
  polarCoordinates = [-0.2, -0.2, 0],
  rotationalCoordinates,
  onClick,
  ...props
}) {
  const [modelLoaded, setModelLoaded] = useState(false);
  
  useEffect(() => {
    console.log("polars changed");
    const materialTest = new THREE.MeshBasicMaterial() ; 
    nodes['GB_02_low_Screen'].material= materialTest  ; 
  }, [polarCoordinates[0]]);

  const modelPath = getModelPath('Test.glb');
  const { scene, nodes, materials } = useGLTF(modelPath);
  const groupRef = useRef();


  useEffect(() => {
    if (scene) {
      setModelLoaded(true);
    }
    
    const video = document.createElement('video');
    video.src = Animation;
    video.crossOrigin = 'Anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.style.filter = 'saturate(0)';

    console.log(video.height);
    console.log(video.width );
    console.log(video);

    
    video.addEventListener('canplaythrough', () => {
      video.play();
    });
    
    video.addEventListener('play', () => {
      const texture = new THREE.VideoTexture(video);
      texture.needsUpdate = true;

      const targetMesh = nodes['GB_02_low_Screen'];
      if (targetMesh) {
        targetMesh.material.map = texture;
        targetMesh.material.map.offset.set( -1.63 ,  -1.95 ) ; 
        targetMesh.material.map.repeat.set( 4.4 ,  4.4 ) ; 
        targetMesh.material.map.center.set( 0 ,  0 ) ; 
        targetMesh.material.map.flipY = true ;
        targetMesh.material.needsUpdate = true;
      }
    });
    
    return () => {
      video.pause();
      video.src = '';
      video.load();
    };
  }, [nodes, scene]);

  const { position, rotation } = useSpring({
    from: { position: [-0.2, -4, 0], rotation: [-0.8, 1, -0.3] },
    to: {
      position: polarCoordinates,
      rotation: rotationalCoordinates
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
      ref={groupRef}
      {...props}
    />
  );
}

// Preload the model
try {
  useGLTF.preload(getModelPath('Test.glb'));
} catch (error) {
  console.error('Error preloading model:', error);
}
